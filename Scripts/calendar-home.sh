#!/usr/bin/env bash
# Verify or repair the Calendar Home setup.
#
# The setup is stored in this repository at its live paths:
#   .obsidian/...             Obsidian, TaskNotes and Homepage settings
#   TaskNotes/Views/*.base    calendar, agenda and the other Bases views
#   mdbase.yaml, _types/      TaskNotes mdbase spec and task schema
#
# Cloning the repo restores all of it, so this script deliberately keeps no
# copy. It checks the parts git cannot enforce on a running install:
#   - plugin versions
#   - plugins enabled
#   - Bases and Daily notes core plugins enabled
#   - homepage target
#   - TaskNotes ICS refresh patch
#
# Usage:
#   ./Scripts/calendar-home.sh --check
#   ./Scripts/calendar-home.sh --repair [--yes]
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(dirname -- "$SCRIPT_DIR")"
MANIFEST="$VAULT_DIR/Profiles/Calendar Home/manifest.json"
PLUGINS_DIR="$VAULT_DIR/.obsidian/plugins"
TASKNOTES_DIR="$PLUGINS_DIR/tasknotes"
HOMEPAGE_DIR="$PLUGINS_DIR/homepage"
COMMUNITY="$VAULT_DIR/.obsidian/community-plugins.json"
CORE="$VAULT_DIR/.obsidian/core-plugins.json"
HOMEPAGE_DATA="$HOMEPAGE_DIR/data.json"
PATCH_SCRIPT="$VAULT_DIR/Scripts/reapply-tasknotes-ics-refresh-patch.sh"
HOME_TARGET="TaskNotes/Views/agenda-default.base"

MODE=""
ASSUME_YES=0
PASS=0
FAIL=0

usage() {
  cat <<'EOF'
Verify or repair the Calendar Home setup.

Usage:
  ./Scripts/calendar-home.sh --check
  ./Scripts/calendar-home.sh --repair [--yes]

Options:
  --check     Report only; exit 1 if anything is off.
  --repair    Fix the parts that can be fixed in place.
  --yes, -y   Skip the repair confirmation prompt.
  -h, --help  Show this help.
EOF
}

for arg in "$@"; do
  case "$arg" in
    --check) MODE="check" ;;
    --repair) MODE="repair" ;;
    --yes|-y) ASSUME_YES=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; usage >&2; exit 2 ;;
  esac
done

if [[ -z "$MODE" ]]; then
  usage >&2
  exit 2
fi

ok()   { printf '  ok    %s\n' "$*"; PASS=$((PASS + 1)); }
bad()  { printf '  FAIL  %s\n' "$*"; FAIL=$((FAIL + 1)); }
note() { printf '  ....  %s\n' "$*"; }

expected_version() {
  # expected_version <plugin-id>
  python3 - "$MANIFEST" "$1" <<'PY' 2>/dev/null || true
import json, sys
try:
    print(json.load(open(sys.argv[1]))["plugins"][sys.argv[2]]["version"])
except Exception:
    pass
PY
}

actual_version() {
  python3 - "$PLUGINS_DIR/$1/manifest.json" <<'PY' 2>/dev/null || true
import json, sys
try:
    print(json.load(open(sys.argv[1]))["version"])
except Exception:
    pass
PY
}

plugin_enabled() {
  python3 - "$COMMUNITY" "$1" <<'PY' 2>/dev/null
import json, sys
try:
    raise SystemExit(0 if sys.argv[2] in json.load(open(sys.argv[1])) else 1)
except SystemExit:
    raise
except Exception:
    raise SystemExit(1)
PY
}

# --- checks ----------------------------------------------------------------

check_files() {
  local rel
  for rel in \
    "TaskNotes/Views/agenda-default.base" \
    "TaskNotes/Views/calendar-default.base" \
    "TaskNotes/Views/mini-calendar-default.base" \
    "TaskNotes/Views/tasks-default.base" \
    "TaskNotes/Views/kanban-default.base" \
    "TaskNotes/Views/pomodoro-stats.base" \
    "TaskNotes/Views/relationships.base" \
    "mdbase.yaml" \
    "_types/task.md"; do
    if [[ -f "$VAULT_DIR/$rel" ]]; then
      ok "$rel"
    else
      bad "$rel missing"
    fi
  done
}

check_plugins() {
  local id expected actual
  for id in tasknotes homepage; do
    expected="$(expected_version "$id")"
    actual="$(actual_version "$id")"
    if [[ -z "$actual" ]]; then
      bad "$id not installed (need $expected)"
    elif [[ "$actual" != "$expected" ]]; then
      bad "$id $actual (expected $expected)"
    else
      ok "$id $actual"
    fi

    if plugin_enabled "$id"; then
      ok "$id enabled"
    else
      bad "$id not enabled"
    fi
  done
}

check_core() {
  local line
  while IFS= read -r line; do
    case "$line" in
      ok\ *) ok "${line#ok }" ;;
      fail\ *) bad "${line#fail }" ;;
    esac
  done < <(python3 - "$CORE" <<'PY'
import json, sys
try:
    data = json.load(open(sys.argv[1]))
except Exception:
    data = {}
for key in ("bases", "daily-notes"):
    print(("ok" if data.get(key) else "fail") + " " + key + " core plugin")
PY
)
}

check_homepage() {
  local line
  while IFS= read -r line; do
    case "$line" in
      ok\ *) ok "${line#ok }" ;;
      fail\ *) bad "${line#fail }" ;;
    esac
  done < <(python3 - "$HOMEPAGE_DATA" "$HOME_TARGET" <<'PY'
import json, sys
path, target = sys.argv[1:3]
try:
    data = json.load(open(path))
except Exception:
    print("fail homepage settings missing")
    raise SystemExit

pages = data.get("homepages") or {}
entry = pages.get("Main Homepage") or next(iter(pages.values()), None)
if not entry:
    print("fail no homepage configured")
elif entry.get("value") != target:
    print("fail homepage opens " + str(entry.get("value")))
elif entry.get("openOnStartup") is not True:
    print("fail homepage does not open on startup")
else:
    print("ok homepage " + target)
PY
)
}

check_patch() {
  if [[ ! -f "$TASKNOTES_DIR/main.js" ]]; then
    bad "TaskNotes main.js missing"
  elif grep -q "tnIcsRefreshTimer" "$TASKNOTES_DIR/main.js"; then
    ok "TaskNotes ICS refresh patch"
  else
    bad "TaskNotes ICS refresh patch missing"
  fi
}

run_checks() {
  PASS=0
  FAIL=0
  echo "Calendar Home setup: $VAULT_DIR"
  echo
  check_files
  check_plugins
  check_core
  check_homepage
  check_patch
  echo
  printf '  %d ok, %d failed\n' "$PASS" "$FAIL"
}

# --- repair ----------------------------------------------------------------

repair_plugins() {
  python3 - "$COMMUNITY" "$PLUGINS_DIR" <<'PY'
import json, os, sys
path, plugins_dir = sys.argv[1:3]
try:
    enabled = json.load(open(path))
except Exception:
    enabled = []

changed = []
for plugin_id in ("tasknotes", "homepage"):
    if os.path.isdir(os.path.join(plugins_dir, plugin_id)) and plugin_id not in enabled:
        enabled.append(plugin_id)
        changed.append(plugin_id)

if changed:
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(enabled, handle, indent=2)
        handle.write("\n")
    print("  enabled: " + ", ".join(changed))
else:
    print("  plugins already enabled")
PY
}

repair_core() {
  python3 - "$CORE" <<'PY'
import json, os, sys
path = sys.argv[1]
try:
    data = json.load(open(path))
except Exception:
    data = {}

changed = []
for key in ("bases", "daily-notes"):
    if not data.get(key):
        data[key] = True
        changed.append(key)

if changed:
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2)
        handle.write("\n")
    print("  enabled core: " + ", ".join(changed))
else:
    print("  core plugins already enabled")
PY
}

repair_homepage() {
  if [[ ! -f "$HOMEPAGE_DATA" ]]; then
    echo "  homepage settings missing; restore them with:" >&2
    echo "    git restore .obsidian/plugins/homepage/data.json" >&2
    return 1
  fi
  python3 - "$HOMEPAGE_DATA" "$HOME_TARGET" <<'PY'
import json, sys
path, target = sys.argv[1:3]
data = json.load(open(path))
pages = data.setdefault("homepages", {})
entry = pages.setdefault("Main Homepage", {})
entry["value"] = target
entry["kind"] = "File"
entry["openOnStartup"] = True
entry["pin"] = True
with open(path, "w", encoding="utf-8") as handle:
    json.dump(data, handle, indent=2, ensure_ascii=False)
    handle.write("\n")
print("  homepage set to " + target)
PY
}

repair_patch() {
  if [[ -f "$PATCH_SCRIPT" ]]; then
    bash "$PATCH_SCRIPT"
  else
    echo "  patch script missing: $PATCH_SCRIPT" >&2
    return 1
  fi
}

# --- main ------------------------------------------------------------------

if [[ "$MODE" == "check" ]]; then
  run_checks
  [[ $FAIL -eq 0 ]] || exit 1
  exit 0
fi

if [[ $ASSUME_YES -eq 0 ]]; then
  echo "Repair the Calendar Home setup in: $VAULT_DIR"
  echo "This enables plugins, sets the homepage target and reapplies the TaskNotes patch."
  read -r -p "Continue? [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

echo "Repairing:"
repair_plugins
repair_core
repair_homepage
repair_patch

echo
run_checks
echo
echo "Quit and reopen Obsidian so the plugin changes load."
[[ $FAIL -eq 0 ]] || exit 1
