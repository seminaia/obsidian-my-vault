# Calendar Home

Obsidian vault whose homepage is a TaskNotes calendar/agenda. This page describes the setup and how to reproduce it exactly on another machine.

## What the setup is

- Obsidian opens [the agenda](TaskNotes/Views/agenda-default.base) as the pinned homepage.
- The agenda and the full calendar are TaskNotes Bases views over `#task` notes.
- They render three ICS subscriptions: WPI, GMAIL, ICLOUD.
- The TaskNotes ICS refresh patch makes subscribed events appear on a cold start.

## Restore on another device

1. Clone the repository and open it in Obsidian 1.14.5.
2. Check that **TaskNotes 4.14.0** and **Homepage 4.6.0** are installed. Both plugin folders are tracked, so the code is already in `.obsidian/plugins/`.
3. Quit Obsidian completely.
4. Run `./Scripts/calendar-home.sh --repair`.
5. Reopen Obsidian.

The repair step enables the two plugins and the **Bases** / **Daily notes** core plugins, points Homepage at the agenda, and reapplies the TaskNotes patch. It does not overwrite your Bases or settings.

## Verify

```bash
./Scripts/calendar-home.sh --check
```

That reports, line by line: the seven Bases, `mdbase.yaml`, `_types/task.md`, both plugin versions, both plugins enabled, the two core plugins, the homepage target, and the patch. Exit code 1 if anything is off.

## Where the settings live

| Vault path | What it controls |
| --- | --- |
| `.obsidian/plugins/tasknotes/data.json` | Task folders, field mapping, statuses, calendar view defaults, the three ICS feeds. |
| `.obsidian/plugins/homepage/data.json` | Opens `TaskNotes/Views/agenda-default.base` on startup, pinned. |
| `.obsidian/community-plugins.json` | TaskNotes and Homepage enabled. |
| `.obsidian/core-plugins.json` | Bases and Daily notes enabled. |
| `.obsidian/daily-notes.json` | Daily note folder/template used by the calendar's date links. |
| `.obsidian/appearance.json`, `.obsidian/types.json` | Theme, accent colour, property types. |
| `TaskNotes/Views/*.base` | Agenda, full calendar, mini calendar, and the other TaskNotes views. |
| `mdbase.yaml`, `_types/task.md` | mdbase collection spec and task schema. |

Everything is stored at its live path and tracked by git, so a clone reproduces it exactly. There is no second copy to drift. The pinned versions and the patch contract are in [manifest.json](Profiles/Calendar%20Home/manifest.json).

## If a setting drifts

Restore the committed versions of just the setup files:

```bash
git restore -- .obsidian/plugins/tasknotes/data.json \
  .obsidian/plugins/homepage/data.json \
  TaskNotes/Views mdbase.yaml _types/task.md
```

Then run `--check` again.

## After a TaskNotes update

> **Note:** Updating the plugin overwrites `.obsidian/plugins/tasknotes/main.js`, which removes the ICS refresh fix. Run `./Scripts/calendar-home.sh --repair` (or `Scripts/reapply-tasknotes-ics-refresh-patch.sh`) to put it back. `--check` reports whether it is missing.

## Caveat

> **Warning:** This repository is public. `.obsidian/plugins/tasknotes/data.json` contains the three private ICS feed URLs and a TaskNotes API token, and it is committed here. Anyone with the repo can read the calendar feeds. If that is not intended, rotate the published calendar links (Outlook/Google/iCloud) and the API token, then make the repository private.
