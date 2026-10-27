#!/usr/bin/env bash
# Apply the saved "Calendar Home" profile to this vault.
#
# The profile lives in "Profiles/Calendar Home/" and contains a snapshot of
# everything that makes the calendar/agenda homepage work: the TaskNotes Bases
# views, TaskNotes + Homepage settings, the mdbase type spec, and the core
# Obsidian settings those depend on.
#
# What this script does:
#   1. Warns if Obsidian is running (it rewrites plugin data.json on quit).
#   2. Backs up every file it is about to touch.
#   3. Restores the snapshot, merging the Obsidian config files instead of
#      clobbering unrelated settings.
#   4. Re-applies the TaskNotes ICS refresh patch to main.js.
#   5. Verifies the installed plugin versions against the profile manifest.
#
# Usage:
#   ./Scripts/apply-calendar-home-profile.sh              # apply (asks first)
#   ./Scripts/apply-calendar-home-profile.sh --yes        # apply, no prompt
#   ./Scripts/apply-calendar-home-profile.sh --dry-run    # show what would change
#   ./Scripts/apply-calendar-home-profile.sh --check      # verify only, no writes
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(dirname -- "$SCRIPT_DIR")"
PROFILE_DIR="$VAULT_DIR/Profiles/Calendar Home"
FILES_DIR="$PROFILE_DIR/files"
MANIFEST="$PROFILE_DIR/manifest.json"
BACKUP_ROOT="$PROFILE_DIR/.backups"
PLUGINS_DIR="$VAULT_DIR/.obsidian/plugins"
PATCH_SCRIPT="$VAULT_DIR/Scripts/reapply-tasknotes-ics-refresh-patch.sh"

DRY_RUN=0
ASSUME_YES=0
CHECK_ONLY=0

usage() {
  cat <<'EOF'
Apply the Calendar Home profile to this vault.

Usage:
  ./Scripts/apply-calendar-home-profile.sh [--dry-run | --check] [--yes]

Options:
  --dry-run   Print the planned changes without writing anything.
  --check     Verify the profile is applied; exit 1 if it is not.
  --yes, -y   Skip the confirmation prompt.
  -h, --help  Show this help.

Restore always writes a timestamped backup under:
  Profiles/Calendar Home/.backups/
EOF
}

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --check) CHECK_ONLY=1 ;;
    --yes|-y) ASSUME_YES=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; usage >&2; exit 2 ;;
  esac
done

if [[ ! -d "$FILES_DIR" ]]; then
  echo "Profile not found: $FILES_DIR" >&2
  exit 1
fi

# --- helpers ---------------------------------------------------------------

# How each snapshot file is restored:
#   replace  copy over the target
#   merge    recursively merge JSON objects (snapshot wins)
#   plugins  append missing plugin ids, but only for plugins that are installed
#   core     enable the core plugins listed in the manifest
mode_for() {
  case "$1" in
    .obsidian/community-plugins.json) echo plugins ;;
    .obsidian/core-plugins.json)      echo core ;;
    .obsidian/appearance.json|.obsidian/types.json|.obsidian/daily-notes.json) echo merge ;;
    *) echo replace ;;
  esac
}

json_get() {
  # json_get <file> <dotted.path>
  python3 - "$1" "$2" <<'PY'
import json, sys
try:
    value = json.load(open(sys.argv[1]))
except Exception:
    raise SystemExit(1)
for part in sys.argv[2].split("."):
    if not isinstance(value, dict) or part not in value:
        raise SystemExit(1)
    value = value[part]
print(value)
PY
}

merge_json() {
  # merge_json <target> <source> <mode>
  local dst="$1" src="$2" kind="$3"
  if [[ ! -f "$dst" ]]; then
    cp "$src" "$dst"
    return
  fi
  python3 - "$dst" "$src" "$kind" "$PLUGINS_DIR" <<'PY'
import json, os, sys

dst, src, kind, plugins_dir = sys.argv[1:5]
base = json.load(open(dst))
over = json.load(open(src))

def deep_merge(a, b):
    for key, value in b.items():
        if isinstance(value, dict) and isinstance(a.get(key), dict):
            deep_merge(a[key], value)
        else:
            a[key] = value
    return a

if kind == "plugins" and isinstance(base, list) and isinstance(over, list):
    installed = {
        name for name in os.listdir(plugins_dir)
        if os.path.isdir(os.path.join(plugins_dir, name))
    } if os.path.isdir(plugins_dir) else set()
    merged = list(base)
    for plugin_id in over:
        if plugin_id not in merged and plugin_id in installed:
            merged.append(plugin_id)
elif kind == "core" and isinstance(base, dict) and isinstance(over, dict):
    # Enable the core plugins the profile depends on; leave the rest alone.
    merged = dict(base)
    for key in ("bases", "daily-notes"):
        if key in over:
            merged[key] = over[key]
elif isinstance(base, dict) and isinstance(over, dict):
    merged = deep_merge(base, over)
else:
    merged = over

with open(dst, "w", encoding="utf-8") as handle:
    json.dump(merged, handle, indent=2, ensure_ascii=False)
    handle.write("\n")
PY
}

restore_local_api_token() {
  # Keep the target device's TaskNotes API token: the snapshot ships it blank.
  local dst="$1" prev="$2"
  [[ -f "$prev" ]] || return 0
  python3 - "$dst" "$prev" <<'PY'
import json, sys

dst, prev = sys.argv[1:3]
current = json.load(open(dst))
try:
    previous = json.load(open(prev))
except Exception:
    raise SystemExit(0)

if not current.get("apiAuthToken") and previous.get("apiAuthToken"):
    current["apiAuthToken"] = previous["apiAuthToken"]
    with open(dst, "w", encoding="utf-8") as handle:
        json.dump(current, handle, indent=2, ensure_ascii=False)
        handle.write("\n")
    print("  kept this device's TaskNotes API token")
PY
}

same_snapshot() {
  # same_snapshot <snapshot> <live> <rel>
  # TaskNotes data.json is compared without device-local fields.
  local src="$1" dst="$2" rel="$3"
  if [[ "$rel" == ".obsidian/plugins/tasknotes/data.json" ]]; then
    python3 - "$src" "$dst" <<'PY'
import json, sys

snapshot = json.load(open(sys.argv[1]))
live = json.load(open(sys.argv[2]))
for key in ("apiAuthToken", "pomodoroState", "lastPomodoroDate"):
    snapshot.pop(key, None)
    live.pop(key, None)
raise SystemExit(0 if snapshot == live else 1)
PY
    return
  fi
  cmp -s "$src" "$dst"
}

# --- preflight -------------------------------------------------------------

if [[ $CHECK_ONLY -eq 0 ]] && { pgrep -ix obsidian >/dev/null 2>&1 || pgrep -f "/Obsidian.app/" >/dev/null 2>&1; }; then
  echo
  echo "!! Obsidian is running."
  echo "   Quit Obsidian completely first: it rewrites plugin data.json on exit"
  echo "   and would overwrite the restored settings."
  echo
  if [[ $DRY_RUN -eq 0 && $ASSUME_YES -eq 0 ]]; then
    read -r -p "Continue anyway? [y/N] " reply
    [[ "$reply" =~ ^[Yy]$ ]] || exit 1
  fi
fi

REL_PATHS=()
while IFS= read -r rel_line; do
  REL_PATHS+=("$rel_line")
done < <(cd "$FILES_DIR" && find . -type f -print | sed 's|^\./||' | sort)

if [[ $CHECK_ONLY -eq 1 ]]; then
  echo "Checking Calendar Home profile in: $VAULT_DIR"
  status=0
  for rel in "${REL_PATHS[@]}"; do
    src="$FILES_DIR/$rel"
    dst="$VAULT_DIR/$rel"
    mode="$(mode_for "$rel")"
    if [[ ! -f "$dst" ]]; then
      printf '  MISSING  %s\n' "$rel"; status=1
    elif [[ "$mode" == "replace" ]] && ! same_snapshot "$src" "$dst" "$rel"; then
      printf '  DIFF     %s\n' "$rel"; status=1
    else
      printf '  ok       %s\n' "$rel"
    fi
  done

  for plugin in tasknotes homepage; do
    expected="$(json_get "$MANIFEST" "plugins.$plugin.version" 2>/dev/null || echo '?')"
    actual="$(json_get "$PLUGINS_DIR/$plugin/manifest.json" version 2>/dev/null || echo 'not installed')"
    if [[ "$expected" == "$actual" ]]; then
      printf '  ok       %s %s\n' "$plugin" "$actual"
    else
      printf '  VERSION  %s: expected %s, found %s\n' "$plugin" "$expected" "$actual"; status=1
    fi
  done

  if [[ -f "$PLUGINS_DIR/tasknotes/main.js" ]] && grep -q "tnIcsRefreshTimer" "$PLUGINS_DIR/tasknotes/main.js"; then
    printf '  ok       TaskNotes ICS refresh patch\n'
  else
    printf '  MISSING  TaskNotes ICS refresh patch (run the apply script)\n'; status=1
  fi
  exit $status
fi

if [[ $DRY_RUN -eq 0 && $ASSUME_YES -eq 0 ]]; then
  echo "About to restore the Calendar Home profile into:"
  echo "  $VAULT_DIR"
  read -r -p "Continue? [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$BACKUP_ROOT/$TIMESTAMP"

# --- restore ---------------------------------------------------------------

if [[ $DRY_RUN -eq 1 ]]; then
  echo "Dry run - no files will be written."
  echo
fi

for rel in "${REL_PATHS[@]}"; do
  src="$FILES_DIR/$rel"
  dst="$VAULT_DIR/$rel"
  mode="$(mode_for "$rel")"
  printf '  %-8s %s\n' "$mode" "$rel"

  if [[ $DRY_RUN -eq 1 ]]; then
    continue
  fi

  if [[ -f "$dst" ]]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$rel")"
    cp -p "$dst" "$BACKUP_DIR/$rel"
  fi

  mkdir -p "$(dirname "$dst")"
  if [[ "$mode" == "replace" ]]; then
    cp "$src" "$dst"
  else
    merge_json "$dst" "$src" "$mode"
  fi

  if [[ "$rel" == ".obsidian/plugins/tasknotes/data.json" ]]; then
    restore_local_api_token "$dst" "$BACKUP_DIR/$rel"
  fi
done

if [[ $DRY_RUN -eq 1 ]]; then
  echo
  echo "Would back up replaced files to $BACKUP_ROOT/<timestamp>/"
  echo "Would then run: $PATCH_SCRIPT"
  exit 0
fi

echo
echo "Backup: $BACKUP_DIR"

# --- TaskNotes ICS refresh patch -------------------------------------------

echo
if [[ -f "$PATCH_SCRIPT" ]]; then
  bash "$PATCH_SCRIPT"
else
  echo "WARNING: patch script not found: $PATCH_SCRIPT" >&2
  echo "         Calendars may need a manual refresh on cold start." >&2
fi

# --- version check ---------------------------------------------------------

echo
echo "Versions:"
for plugin in tasknotes homepage; do
  expected="$(json_get "$MANIFEST" "plugins.$plugin.version" 2>/dev/null || echo '?')"
  actual="$(json_get "$PLUGINS_DIR/$plugin/manifest.json" version 2>/dev/null || echo 'not installed')"
  if [[ "$expected" == "$actual" ]]; then
    printf '  %-10s %s\n' "$plugin" "$actual"
  else
    printf '  %-10s %s (profile built with %s)\n' "$plugin" "$actual" "$expected"
  fi
done

echo
echo "Done. Quit and reopen Obsidian, then open the homepage."
echo "If the calendar looks empty, run:"
echo "  $PATCH_SCRIPT --check"
