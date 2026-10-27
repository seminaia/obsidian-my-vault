---
title: Calendar Home
profile_version: 1
saved: 2026-10-26
obsidian: 1.14.5
tasknotes: 4.14.0
homepage: 4.6.0
---

# Calendar Home

A saved snapshot of the calendar/agenda homepage setup, together with every setting it depends on, so the same vault can be rebuilt identically on another device or in a fresh clone.

> [!info] What this reproduces
> Obsidian opens [[agenda-default.base|the agenda]] as the pinned homepage. The agenda and the full calendar are TaskNotes Bases views over `#task` notes, and they also render events from three ICS subscriptions (WPI, GMAIL, ICLOUD). The TaskNotes ICS refresh patch is reapplied on restore, so subscribed events appear on a cold start without pressing Refresh.

## Restore

> [!warning] Quit Obsidian first
> Obsidian rewrites plugin `data.json` files when it exits. Restoring while it is running can silently undo the settings.

From the vault root:

```bash
./Scripts/apply-calendar-home-profile.sh --dry-run   # preview
./Scripts/apply-calendar-home-profile.sh             # apply
```

The script backs up everything it touches to `Profiles/Calendar Home/.backups/<timestamp>/`, merges the Obsidian config files instead of clobbering unrelated settings, reapplies the TaskNotes patch, and prints the installed plugin versions.

Afterwards, quit and reopen Obsidian. If the homepage does not appear, open [[agenda-default.base]] once — the Homepage plugin pins it from then on.

To verify without writing anything:

```bash
./Scripts/apply-calendar-home-profile.sh --check
```

## On another device or a fresh clone

1. Clone the vault repository and open it in Obsidian 1.14.5.
2. Enable **TaskNotes 4.14.0** and **Homepage 4.6.0** in *Settings → Community plugins*. Both plugin folders are tracked in this repository, so the code is already there; only the enable flag is needed.
3. Quit Obsidian.
4. Run `./Scripts/apply-calendar-home-profile.sh --yes`.
5. Reopen Obsidian and open the agenda.

> [!note] Plugin versions matter
> The profile was captured against TaskNotes 4.14.0 and Homepage 4.6.0. A different version may migrate or reject the saved `data.json`. Install those versions first, or check the version warnings the script prints.

## What is included

| Vault path                                                                                               | Role                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `TaskNotes/Views/agenda-default.base`                                                                    | The homepage. Week agenda over tasks + ICS events.                                                    |
| `TaskNotes/Views/calendar-default.base`                                                                  | Full calendar Base.                                                                                   |
| `TaskNotes/Views/mini-calendar-default.base`                                                             | Compact calendar Base.                                                                                |
| `TaskNotes/Views/tasks-default.base`, `kanban-default.base`, `pomodoro-stats.base`, `relationships.base` | Remaining TaskNotes Bases, kept so the set is complete.                                               |
| `.obsidian/plugins/tasknotes/data.json`                                                                  | TaskNotes settings: task folders, field mapping, statuses, calendar view defaults, ICS subscriptions. |
| `.obsidian/plugins/homepage/data.json`                                                                   | Which note opens on startup and how.                                                                  |
| `.obsidian/community-plugins.json`                                                                       | Enabled plugin list. Restore adds the profile's plugins that are installed.                           |
| `.obsidian/core-plugins.json`                                                                            | Core plugin state. Restore only forces **Bases** and **Daily notes** on.                              |
| `.obsidian/daily-notes.json`                                                                             | Daily note folder/template used by the calendar's date links.                                         |
| `.obsidian/appearance.json`                                                                              | Theme, accent colour, ribbon.                                                                         |
| `.obsidian/types.json`                                                                                   | Property type overrides used by the Bases views.                                                      |
| `mdbase.yaml`, `_types/task.md`                                                                          | TaskNotes mdbase collection spec and task schema.                                                     |

The exact list, modes and checksums live in [[Profiles/Calendar Home/manifest.json|manifest.json]].

> [!note] Profile layout
> `Profiles/Calendar Home/files/` mirrors the vault paths it restores, including the hidden `.obsidian/` folder, so each snapshot file maps 1:1 onto its destination. Backups from every restore go to `Profiles/Calendar Home/.backups/` (git-ignored).

## What is not included

- **Window/tab layout** (`.obsidian/workspace.json`, `workspaces.json`) — panel sizes and open tabs are per device. Reopen the views once and Obsidian saves them locally.
- **Plugin binaries** — already tracked elsewhere in `.obsidian/plugins/`; the profile only pins versions.
- **Vault content** — task notes, events, daily notes and templates stay in the vault.
- **Credentials** — the TaskNotes API token is blanked in the snapshot and re-used from the target device when one exists. See the warning below.

> [!danger] This repository is public
> `.obsidian/plugins/tasknotes/data.json` is tracked in a public GitHub repository and contains the three private ICS feed URLs, plus a TaskNotes API token. Anyone with the repo can read the calendar feeds. If that is not intended, rotate the published calendar links (Outlook/Google/iCloud) and the TaskNotes API token, then make the repository private. The profile snapshot keeps the feed URLs for fidelity but never stores the API token.

## Maintenance

The snapshot only stays accurate if it is refreshed after changing the setup:

```bash
./Scripts/save-calendar-home-profile.sh
```

That copies the live files back into `files/`, blanks the API token and pomodoro state, and rewrites [[Profiles/Calendar Home/manifest.json|manifest.json]] with new checksums.

> [!tip] After a TaskNotes update
> Updating the plugin overwrites `main.js`, which removes the ICS refresh fix. Re-run `Scripts/reapply-tasknotes-ics-refresh-patch.sh` (or the apply script) to put it back. `--check` reports whether it is missing.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Calendar is empty on first open | `Scripts/apply-calendar-home-profile.sh --check`, then reapply the patch and reopen the view. |
| Only one ICS feed shows | The patch debounces refetches by 1s; wait a moment or close/reopen the view. |
| Homepage does not open | Check Homepage settings: `TaskNotes/Views/agenda-default.base`, *open on startup* on. |
| Events appear but tasks do not | The Bases filter is `file.hasTag("task")`; confirm task notes carry the `task` tag. |
| Daily notes land in the wrong place | Adjust `daily-notes.json` after restore; the saved template points at `2026/W44.md`. |
