#!/usr/bin/env bash
# Re-apply the ICS refresh fix to the TaskNotes plugin after an update.
#
# TaskNotes' Bases calendar view does not subscribe to the ICS subscription
# service. On a cold start the calendar renders before the subscriptions have
# been fetched, and nothing refreshes it when the fetch finishes. This patch
# makes every open Bases calendar refetch its events whenever the ICS cache
# changes (including the initial load), so the homepage shows subscribed
# calendars without a manual "Refresh".
#
# Safe to run repeatedly: it does nothing if the patch is already present.
#
# Usage:
#   ./Scripts/reapply-tasknotes-ics-refresh-patch.sh          # patch
#   ./Scripts/reapply-tasknotes-ics-refresh-patch.sh --check  # report only
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(dirname -- "$SCRIPT_DIR")"
MAIN_JS="$VAULT_DIR/.obsidian/plugins/tasknotes/main.js"
BACKUP="$HOME/tasknotes-main.js.bak"

if [[ ! -f "$MAIN_JS" ]]; then
  echo "Not found: $MAIN_JS" >&2
  echo "Is the TaskNotes plugin installed in this vault?" >&2
  exit 1
fi

if grep -q 'icsSubscriptionService.on("data-changed"' "$MAIN_JS"; then
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
needle = "n.icsSubscriptionService=new C_(n),n.icsNoteService=new D_(n)"
if src.count(needle) != 1:
    raise SystemExit("patch point not found or ambiguous - plugin code changed")

replacement = (
    "n.icsSubscriptionService=new C_(n);"
    'n.icsSubscriptionService.on("data-changed",()=>{'
    "try{"
    "n.app.workspace.iterateAllLeaves(t=>{"
    "try{"
    "let r=t.view&&t.view.controller&&t.view.controller.view;"
    'if(!r||r.type!=="tasknotesCalendar"||!r.calendar||'
    'typeof r.calendar.refetchEvents!="function"||'
    "!t.view.containerEl||!t.view.containerEl.isConnected)return;"
    "r.calendar.refetchEvents()"
    "}catch(r){}"
    "})"
    "}catch(t){}"
    "});"
    "n.icsNoteService=new D_(n)"
)
open(p, "w", encoding="utf-8").write(src.replace(needle, replacement, 1))
print("Patched: " + p)
PY

echo "Backup: $BACKUP"
echo "Next: in Obsidian, run 'Reload plugin' for TaskNotes (or restart Obsidian),"
echo "then open the calendar Base."
