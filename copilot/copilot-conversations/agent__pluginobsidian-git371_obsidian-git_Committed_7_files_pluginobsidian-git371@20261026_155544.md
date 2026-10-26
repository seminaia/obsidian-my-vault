---
epoch: 1793044544333
mode: agent
backendId: opencode
sessionId: "ses_e864006caffeR5nRPvdyjL33kn"
tags:
  - copilot-conversation
usage: '{"usedTokens":6923,"contextWindow":1048576,"updatedAt":1793044580884}'
---

**user**: plugin:obsidian-git:371 obsidian-git: Committed 7 files
plugin:obsidian-git:371 obsidian-git: Pulling....
plugin:obsidian-git:371 obsidian-git: Pull: Everything is up-to-date
plugin:obsidian-git:371 obsidian-git: No commits to push
plugin:obsidian-full-calendar:64678 Revalidating remote calendars...
revalidateRemoteCalendars @ plugin:obsidian-full-calendar:64678
plugin:obsidian-full-calendar:64678 Revalidating remote calendars...
revalidateRemoteCalendars @ plugin:obsidian-full-calendar:64678
plugin:obsidian-full-calendar:64715 Revalidation failed with reason: TypeError: Cannot read properties of undefined (reading 'property')
eval @ plugin:obsidian-full-calendar:64715
plugin:obsidian-full-calendar:64678 Revalidating remote calendars...
revalidateRemoteCalendars @ plugin:obsidian-full-calendar:64678
plugin:obsidian-full-calendar:64715 Revalidation failed with reason: Error: Event with given ID "ics::2611E27A-2708-449A-9689-E80478C2B7E8::2025-10-30::single" that was supposed to be added to calendar "ical::https://outlook.office365.com/owa/calendar/228c818532f344acb20622dccbccdcf3@wpi.edu/1c57b7eed9a74a7ab4e870860957981d11167500164446565170/calendar.ics" already exists in the EventStore within calendar "ical::https://calendar.google.com/calendar/ical/seminaia401%40gmail.com/public/basic.ics".
eval @ plugin:obsidian-full-calendar:64715
[Timestamp: 2026/10/26 15:55:44]

**ai**: Those logs show `obsidian-full-calendar` failing to revalidate remote calendars — two distinct errors:

1. `TypeError: Cannot read properties of undefined (reading 'property')`
2. A duplicate event ID collision: an event (`ics::2611E27A-...::2025-10-30::single`) exists in both an Outlook ICS calendar and a Google Calendar ICS source.

The obsidian-git lines are normal (committed 7 files, pull up-to-date, nothing to push).

Want me to investigate anything specific — e.g., find the conflicting calendar configs, or look at the full-calendar plugin settings in the vault?
[Timestamp: 2026/10/26 15:55:44]

**user**: Why isnt it allowing me to put google and outlook in there
[Timestamp: 2026/10/26 15:56:16]

**ai**: That's the cause: **both ICS feeds contain an event with the same UID** (`2611E27A-2708-449A-9689-E80478C2B7E8`, dated 2025-10-30). `obsidian-full-calendar` keys events by their ICS `UID`, so when Google and Outlook both publish that event, the plugin's EventStore sees a collision and refuses to add the duplicate.

This usually happens when one calendar is subscribed/mirrored into the other, or the same event was imported into both accounts.

Options to fix:

1. **Dedupe at the source** — find that event in one of the two accounts (Google or Outlook) and delete the duplicate there, so only one feed publishes it.
2. **Drop one of the two sources** from the plugin (remove it from `calendarSources` in `.obsidian/plugins/obsidian-full-calendar/data.json`) if they're redundant.
3. If you *want* both but they're genuinely different calendars, the plugin can't disambiguate by UID — there's no per-source namespace in this version, so you'd need to keep them de-duplicated.

The first `TypeError: Cannot read properties of undefined (reading 'property')` is a separate, possibly related rendering glitch during revalidation; it may clear up once the duplicate is resolved.

Want me to remove one of the two calendar sources from the config, or help locate the duplicate event?
[Timestamp: 2026/10/26 15:56:16]