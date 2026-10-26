#!/usr/bin/env bash
# Re-apply the duplicate-UID fix to obsidian-full-calendar after a plugin update.
# Safe to run repeatedly: it does nothing if the patch is already present.
#
# Usage:
#   ./Scripts/reapply-full-calendar-patch.sh          # patch
#   ./Scripts/reapply-full-calendar-patch.sh --check  # report only
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(dirname -- "$SCRIPT_DIR")"
MAIN_JS="$VAULT_DIR/.obsidian/plugins/obsidian-full-calendar/main.js"
BACKUP="$HOME/full-calendar-main.js.bak"

if [[ ! -f "$MAIN_JS" ]]; then
  echo "Not found: $MAIN_JS" >&2
  echo "Is obsidian-full-calendar installed in this vault?" >&2
  exit 1
fi

if grep -q "Skipping duplicate event" "$MAIN_JS"; then
  echo "Already patched: $MAIN_JS"
  exit 0
fi

if [[ "${1:-}" == "--check" ]]; then
  echo "NOT patched: $MAIN_JS"
  exit 1
fi

cp "$MAIN_JS" "$BACKUP"
python3 - "$MAIN_JS" <<'PY'
import sys
p = sys.argv[1]
src = open(p, encoding="utf-8").read()
needle = 'throw new Error(`Event with given ID "${id}"'
i = src.find(needle)
if i == -1:
    raise SystemExit("patch point not found - plugin code changed")
i = src.rfind("\n", 0, i) + 1          # start of the offending line
j = src.find("\n", i)
indent = src[i:src.find("throw", i)]   # preserve leading whitespace only
replacement = (
    indent + "// Patched: allow the same UID in more than one calendar source.\n" +
    indent + "console.warn(`Skipping duplicate event \"${id}\" from calendar \"${calendar.id}\".`);\n" +
    indent + "return;"
)
open(p, "w", encoding="utf-8").write(src[:i] + replacement + src[j:])
print("Patched: " + p)
PY

echo "Backup: $BACKUP"
echo "Next: in Obsidian, run 'Reload plugin' for obsidian-full-calendar,"
echo "then the 'Full Calendar: Revalidate' command."
