#!/usr/bin/env bash
# Re-snapshot the live calendar/homepage setup into the Calendar Home profile.
#
# Run this after changing anything the profile covers (TaskNotes settings,
# calendar/agenda Bases, Homepage settings, daily notes, appearance). It copies
# the live files into "Profiles/Calendar Home/files/", blanks device-local
# secrets and runtime state, and rewrites manifest.json with fresh checksums.
#
# Usage:
#   ./Scripts/save-calendar-home-profile.sh            # save
#   ./Scripts/save-calendar-home-profile.sh --dry-run  # show what would be copied
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(dirname -- "$SCRIPT_DIR")"
PROFILE_DIR="$VAULT_DIR/Profiles/Calendar Home"
FILES_DIR="$PROFILE_DIR/files"
MANIFEST="$PROFILE_DIR/manifest.json"
README="$PROFILE_DIR/README.md"

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
elif [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  sed -n '2,11p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
  exit 0
elif [[ -n "${1:-}" ]]; then
  echo "Unknown option: $1" >&2
  exit 2
fi

if [[ ! -f "$MANIFEST" ]]; then
  echo "Not found: $MANIFEST" >&2
  echo "Is this the vault that owns the profile?" >&2
  exit 1
fi

# Live paths covered by the profile. Keep this in sync with the manifest.
SOURCES=(
  "TaskNotes/Views/agenda-default.base"
  "TaskNotes/Views/calendar-default.base"
  "TaskNotes/Views/mini-calendar-default.base"
  "TaskNotes/Views/kanban-default.base"
  "TaskNotes/Views/tasks-default.base"
  "TaskNotes/Views/pomodoro-stats.base"
  "TaskNotes/Views/relationships.base"
  ".obsidian/plugins/tasknotes/data.json"
  ".obsidian/plugins/homepage/data.json"
  ".obsidian/community-plugins.json"
  ".obsidian/core-plugins.json"
  ".obsidian/daily-notes.json"
  ".obsidian/appearance.json"
  ".obsidian/types.json"
  "mdbase.yaml"
  "_types/task.md"
)

missing=0
for rel in "${SOURCES[@]}"; do
  if [[ ! -f "$VAULT_DIR/$rel" ]]; then
    echo "MISSING live file: $rel" >&2
    missing=1
  fi
done
[[ $missing -eq 0 ]] || { echo "Aborted; nothing written." >&2; exit 1; }

if [[ $DRY_RUN -eq 1 ]]; then
  echo "Would copy into $FILES_DIR:"
  printf '  %s\n' "${SOURCES[@]}"
  echo "Would then sanitize TaskNotes data.json and rewrite manifest.json."
  exit 0
fi

# Warn about files in the profile that are no longer produced by this script.
while IFS= read -r rel; do
  keep=0
  for src in "${SOURCES[@]}"; do
    [[ "$rel" == "$src" ]] && { keep=1; break; }
  done
  [[ $keep -eq 0 ]] && echo "WARNING: profile file no longer covered: $rel (left in place)"
done < <(cd "$FILES_DIR" && find . -type f -print | sed 's|^\./||' | sort)

for rel in "${SOURCES[@]}"; do
  mkdir -p "$FILES_DIR/$(dirname "$rel")"
  cp "$VAULT_DIR/$rel" "$FILES_DIR/$rel"
  printf '  saved %s\n' "$rel"
done

python3 - "$PROFILE_DIR" <<'PY'
import collections, datetime, hashlib, json, os, re, sys

profile_dir = sys.argv[1]
files_dir = os.path.join(profile_dir, "files")
manifest_path = os.path.join(profile_dir, "manifest.json")
readme_path = os.path.join(profile_dir, "README.md")

data_path = os.path.join(files_dir, ".obsidian/plugins/tasknotes/data.json")
data = json.load(open(data_path), object_pairs_hook=collections.OrderedDict)
data["apiAuthToken"] = ""
data["pomodoroState"] = {"isRunning": False, "timeRemaining": 1500}
data["lastPomodoroDate"] = ""
with open(data_path, "w", encoding="utf-8") as handle:
    json.dump(data, handle, indent=2, ensure_ascii=False)
    handle.write("\n")
print("  sanitized .obsidian/plugins/tasknotes/data.json (api token, pomodoro state)")

manifest = json.load(open(manifest_path), object_pairs_hook=collections.OrderedDict)
today = datetime.date.today().isoformat()

existing = {entry["path"]: entry for entry in manifest.get("files", [])}
entries = []
for root, _dirs, names in os.walk(files_dir):
    for name in names:
        absolute = os.path.join(root, name)
        rel = os.path.relpath(absolute, files_dir).replace(os.sep, "/")
        digest = hashlib.sha256(open(absolute, "rb").read()).hexdigest()
        entry = existing.get(rel)
        if entry is None:
            entry = collections.OrderedDict(
                path=rel,
                mode="replace",
                role="",
                sha256=digest,
            )
            print("  WARNING: new profile file has no description: " + rel)
        else:
            entry["sha256"] = digest
        entries.append(entry)

entries.sort(key=lambda item: item["path"])
manifest["files"] = entries
manifest["created"] = today

with open(manifest_path, "w", encoding="utf-8") as handle:
    json.dump(manifest, handle, indent=2, ensure_ascii=False)
    handle.write("\n")
print("  rewrote manifest.json (%d files)" % len(entries))

if os.path.exists(readme_path):
    text = open(readme_path, encoding="utf-8").read()
    new_text, count = re.subn(r"(?m)^saved: .*$", "saved: " + today, text, count=1)
    if count:
        with open(readme_path, "w", encoding="utf-8") as handle:
            handle.write(new_text)
        print("  updated README frontmatter date")
PY

echo
echo "Saved. Commit the profile if you want it on other devices:"
echo "  git add 'Profiles/Calendar Home' Scripts/apply-calendar-home-profile.sh"
