---
epoch: 1793064631133
mode: agent
backendId: opencode
sessionId: "ses_e85058160ffefi0QbBTafV9ByC"
tags:
  - copilot-conversation
usage: '{"usedTokens":169819,"contextWindow":200000,"updatedAt":1793065545233}'
lastAccessedAt: 1793065526232
---

**user**: I want my agenda/calendar as my homepage but it doesnt load the ics for them when it happens
[Timestamp: 2026/10/26 21:30:31]

**ai**: I found the cause. Let me verify one more detail in TaskNotes' event wiring before I patch it.The first version exposed a second race: the two subscriptions finish about a second apart, and FullCalendar ignores the overlapping refetch. I'll debounce the refresh so it runs once after the batch of fetches settles.Let me validate the cold-start path directly: clear the in-memory ICS cache, force a render (simulating the calendar mounting before the feeds arrive), and see whether the views repopulate on their own.Found it — your feeds are fine. I tested both enabled subscriptions directly:

- **WPI** → HTTP 200, 283 events
- **GMAIL** → HTTP 200, 250 events

The problem is a startup race in TaskNotes 4.14.0: the Bases calendar renders before the ICS subscription service finishes fetching, and the service's `data-changed` notification is wired to Google/Microsoft calendars but **not** to the ICS service. So the first render stays empty, and only a manual refresh or reopening the tab picks up the feeds.

**What I changed**

- Patched `.obsidian/plugins/tasknotes/main.js` so open TaskNotes Bases calendar/agenda views refetch their events when the ICS cache changes. The refresh is debounced by 1 second so the WPI/Gmail fetches don't cause overlapping FullCalendar refetches.
- Added `Scripts/reapply-tasknotes-ics-refresh-patch.sh` to re-apply the fix after a TaskNotes update (updates overwrite `main.js`).

**Verified**

Reloaded TaskNotes and checked the live views: all open calendar and agenda tabs now show **533 events** (283 WPI + 250 Gmail) automatically, without pressing Refresh.

**Notes**

- Your homepage is already configured correctly: it opens `TaskNotes/Views/calendar-default.base` on startup.
- If you see multiple calendar tabs at launch, that's Homepage's **Open in new tab** setting, not the ICS issue.
- **ICLOUD** is currently disabled in TaskNotes; if you expected those events, enable it. Its URL is `http://`, so it's worth regenerating the published link as `https://` first.

Files touched:
- `.obsidian/plugins/tasknotes/main.js`
- `Scripts/reapply-tasknotes-ics-refresh-patch.sh`
[Timestamp: 2026/10/26 21:30:31]

**user**: what did you do
[Timestamp: 2026/10/26 21:45:33]

**ai**: Short version: I diagnosed why the ICS feeds weren't appearing on startup, patched TaskNotes' plugin code to fix it, and added a script so the fix can be re-applied after plugin updates.

### What I found

- Both enabled feeds are valid and reachable: **WPI** (283 events) and **GMAIL** (250 events).
- TaskNotes' Bases calendar renders before the ICS subscription service finishes fetching.
- Unlike the Google/Microsoft calendar services, the ICS service's `data-changed` event was not connected to anything that refreshes the Bases calendar view. So the initial render stayed empty until a manual refresh or reopening the tab.

### What I changed

1. **Patched** `.obsidian/plugins/tasknotes/main.js`
   - Added a listener on the ICS subscription service.
   - When ICS data changes, it waits 1 second (to coalesce the WPI/Gmail fetches) and calls `refetchEvents()` on every open TaskNotes Bases calendar/agenda view.
   - No `.base` files, homepage settings, or notes were changed.

2. **Added** `Scripts/reapply-tasknotes-ics-refresh-patch.sh`
   - Re-applies the same patch after a TaskNotes update, since updates overwrite `main.js`.
   - Running it again when already patched does nothing.
   - A pristine backup is at `~/tasknotes-main.js.bak`.

3. **Reloaded TaskNotes** and verified the open calendar/agenda views repopulated automatically with all **533 events** — no manual Refresh needed.

I also briefly cleared TaskNotes' in-memory ICS cache during testing, then refetched it; the feeds are back to 283 + 250 events.

### How to undo

```bash
cp ~/tasknotes-main.js.bak .obsidian/plugins/tasknotes/main.js
```

Then reload TaskNotes (or restart Obsidian). Updating TaskNotes from the community plugins list will also overwrite the patch — just run `./Scripts/reapply-tasknotes-ics-refresh-patch.sh` afterward to restore the fix.
[Timestamp: 2026/10/26 21:45:33]