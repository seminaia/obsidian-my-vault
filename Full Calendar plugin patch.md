---
title: Full Calendar plugin patch
date: 2026-10-26
tags:
  - maintenance/plugin-patch
  - obsidian
aliases:
  - full calendar fix
  - full calendar duplicate uid
plugin: obsidian-full-calendar
plugin-version: 0.10.7
status: patched
---

# Full Calendar plugin patch

> [!warning] A plugin update wipes this fix
> `obsidian-full-calendar` 0.10.7 is archived and unmaintained. Updating or
> reinstalling the plugin replaces `main.js` and the duplicate-UID crash comes
> back. Re-apply the patch below after any update.

## Why

The plugin stores every calendar's events in one global store keyed by the ICS
`UID`. Its `EventStore.add()` threw an error when the same `UID` arrived from a
second calendar, and that exception aborted revalidation of the **whole**
calendar. Google and Outlook both published the same imported meetings, so one
shared event made an entire calendar load empty.

Full weekly view after the fix: orange (Outlook) and blue (Google) both load.

## What changed

File: `.obsidian/plugins/obsidian-full-calendar/main.js` (around line 64087)

The throwing branch in `add()` now skips the duplicate instead:

```js
  add({ calendar, location, id, event }) {
    if (this.store.has(id)) {
      // Patched: the same UID can legitimately appear in more than one calendar
      // source (e.g. a meeting imported into both Google and Outlook). Skipping
      // the duplicate keeps every other event in both calendars loading instead
      // of aborting the whole revalidation. A backup of the original file is at
      // ~/full-calendar-main.js.bak; reinstalling the plugin also undoes this.
      console.warn(`Skipping duplicate event "${id}" from calendar "${calendar.id}" (already present in "${this.calendarIndex.getRelated(new EventID(id))}").`);
      return;
    }
```

## Verify

In Obsidian's console:

```js
app.plugins.plugins["obsidian-full-calendar"].cache.store.store.size
```

Expected around 582 with both feeds (386 Google + 199 Outlook − 3 shared UIDs).
Zero `Revalidation failed` errors means both calendars loaded.

## On another device

The patched `main.js` lives inside `.obsidian/`, so it only reaches the other
device if plugin files are synced. `obsidian-git` here commits automatically but
**does not push** (`autoPushInterval` is `0`), and the local branch was 13
commits ahead of `obsidian-my-vault/main` when this was written — so a push from
Obsidian Git is required for the other device to pull the fix.

If the patch does not arrive with the sync, run this from the vault root on the
other device, then reload the plugin and revalidate:

```bash
./Scripts/reapply-full-calendar-patch.sh          # patch
./Scripts/reapply-full-calendar-patch.sh --check  # verify
```

## Re-apply after an update

Run the script from the vault root (backs up `main.js` to
`~/full-calendar-main.js.bak`, refuses to double-patch, and fails loudly if the
plugin code changed):

```bash
./Scripts/reapply-full-calendar-patch.sh
```

Then reload the plugin and revalidate:

```bash
obsidian vault="Vault" plugin:reload id=obsidian-full-calendar
obsidian vault="Vault" command id="obsidian-full-calendar:full-calendar-revalidate"
```

> [!note]- Manual fallback if the script is unavailable
> ```bash
> F="$HOME/Vault/.obsidian/plugins/obsidian-full-calendar/main.js"
> cp "$F" "$HOME/full-calendar-main.js.bak"
> python3 - "$F" <<'PY'
> import sys
> p = sys.argv[1]
> src = open(p, encoding="utf-8").read()
> if "Skipping duplicate event" in src:
>     print("already patched")
>     raise SystemExit
> needle = 'throw new Error(`Event with given ID "${id}"'
> i = src.find(needle)
> if i == -1:
>     raise SystemExit("patch point not found — plugin code changed")
> i = src.rfind("\n", 0, i) + 1          # start of the offending line
> j = src.find("\n", i)
> indent = src[i:src.find("throw", i)]   # preserve leading whitespace only
> replacement = (
>     indent + "// Patched: allow the same UID in more than one calendar source.\n" +
>     indent + "console.warn(`Skipping duplicate event \"${id}\" from calendar \"${calendar.id}\".`);\n" +
>     indent + "return;"
> )
> open(p, "w", encoding="utf-8").write(src[:i] + replacement + src[j:])
> print("patched")
> PY
> ```

## Rollback

Restore the original file and reload the plugin:

```bash
cp "$HOME/full-calendar-main.js.bak" "$HOME/Vault/.obsidian/plugins/obsidian-full-calendar/main.js"
```

Reinstalling the plugin from Community plugins also restores it.
