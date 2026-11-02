---
title: Sync Setup
date: 2026-11-02
tags:
  - meta/setup
---

# Sync Setup

> [!info] What this is
> Four devices, two sync islands, one bridge. This note records which tool does what, the order to set it up, and the rules that keep it from breaking. Last verified **2026-11-02** on Ubuntu 26.04.

![[Sync Topology.excalidraw]]

## Devices

| Device | OS | Vault path | Sync role |
| --- | --- | --- | --- |
| ThinkPad-P71 | Ubuntu 26.04 | `~/Vault` | Syncthing peer, **only git auto-writer** |
| HP EliteBook 840 G6 | Windows | `ezkwn-kcmvj/My Vault` | Syncthing peer, git manual only |
| iPad | iPadOS | iCloud Drive | Apple island, git manual only |
| iPhone | iOS | iCloud Drive | Apple island, no git plugin |

## Who does what

| Layer | Covers | Carries |
| --- | --- | --- |
| **Syncthing** | ThinkPad ↔ HP | notes + `.obsidian` (plugins, settings). Excludes `.git`. |
| **iCloud Drive** | iPad ↔ iPhone | notes + `.obsidian` |
| **GitHub** | Apple island ↔ desktop island, plus history | **notes only** — `.obsidian` is deliberately excluded |

GitHub repo: `seminaia/obsidian-my-vault` — **public**, so no credentials may ever be committed.

> [!info] What is deliberately not in git
> `.obsidian/` (197 MB of plugin binaries and settings), `.obsidian-mobile/`, Copilot chat logs, `.copilot/`, plugin debug logs, workspace layout and `.trash/` are all ignored. Plugins travel between desktops over Syncthing. The repo is 84 files, about 24 MB.

> [!warning] iCloud is not the third wheel
> "ICLOUD" inside TaskNotes and Day Planner is a published **calendar feed** (`p44-caldav.icloud.com/published/...`), read-only. It moves calendar events, not files. The iCloud that matters here is iCloud **Drive**, which only the iPad and iPhone use.

## The three rules

1. **One git auto-writer.** The ThinkPad pushes. Everyone else syncs manually or not at all. Three Fit instances pushing every minute is what caused the rejected pushes, the merge commits, and the stuck rebases.
2. **`.git` must not travel while git is working.** Syncthing excludes it (`.stignore`). iCloud cannot exclude anything, so git on the iPad stays manual.
3. **Never run two file-syncers over one folder.** No vault inside iCloud Drive on a machine that also runs Syncthing.

---

## Step 1 — Tailscale (reach the HP from anywhere)

The ThinkPad sits on WPI-Wireless (`130.215.x.x`); the HP sits on a private LAN (`192.168.4.x`). There is no route between them, so `ssh` and Syncthing both fail across networks. Tailscale fixes that and also gives Syncthing a direct path instead of public relays.

### ThinkPad

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Open the printed URL, sign in, authorize. Then check:

```bash
tailscale status
tailscale ip -4
```

### HP

1. Install from <https://tailscale.com/download>, sign in with the **same account**.
2. Enable **MagicDNS** in the Tailscale admin console.

### Connect

```bash
ssh soki@hp-elitebook        # MagicDNS name
ssh soki@100.x.y.z           # or the tailnet IP
```

> [!note] Windows SSH server
> Windows blocks port 22 by default. In an **admin PowerShell** on the HP:
> ```powershell
> Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
> Start-Service sshd
> Set-Service -Name sshd -StartupType Automatic
> ```
> Do **not** port-forward SSH on the router. Keep it inside the tailnet.

---

## Step 2 — Keep the HP awake

A sleeping machine is invisible to both Tailscale and Syncthing. Wake-on-LAN only works on the same LAN, so the HP must be woken physically once, then configured to stay up.

Admin PowerShell on the HP:

```powershell
# Never sleep or hibernate while plugged in
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0

# Screen may still turn off
powercfg /change monitor-timeout-ac 15

# Closing the lid does nothing while plugged in
powercfg /setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg /setactive SCHEME_CURRENT

# Stop the network adapter from powering down
Disable-NetAdapterPowerManagement -Name "Wi-Fi"
```

Verify:

```powershell
powercfg /requests
powercfg /a
```

- `powercfg /requests` should list your adapter and nothing blocking.
- If `powercfg /a` reports **S0 Modern Standby**, the machine may still drop the network with the screen off.

> [!tip] Battery health
> A laptop held awake on AC ages its battery. Cap charging at ~80% in the BIOS (HP calls it **Battery Care**) if it lives on a desk.
>
> Windows Update will still reboot it. Set active hours to cover your working day.

---

## Step 3 — One git writer

### HP — stop pushing

Obsidian → Settings → Fit → **turn auto-sync off**. Keep the plugin installed; it just must not commit.

Also fix its identity — the device name is blank, which is why its commits show as `Commit from `:

- Fit settings → device name → `HP-EliteBook`

### ThinkPad — the only auto-writer

Fit stays on, checking every minute. This is the machine that feeds GitHub for the iPad.

### Verify

```bash
cd ~/Vault
git log origin/main -20 --format="%s" | grep -oE "Commit from [^ ]*( [^ ]+)* on" | sort | uniq -c
```

You want **one** device name in that list.

---

## Step 4 — iPad and iPhone

The Apple island stays on iCloud Drive. That is the transport between iPad and iPhone, and moving it would break the iPhone.

- **Keep the vault in iCloud Drive** on both.
- **iPad:** Fit → auto-sync **off**. Sync manually when you sit down.
- **iPhone:** no git plugin at all. It gets files from iCloud.
- Do not run Obsidian on iPad and iPhone editing the same note at the same time.
- Do not tap sync on the iPad while iCloud is still uploading.

### Give the iPad its own config folder

Without this, Obsidian reloads the whole app after every sync. Fit writes into `.obsidian`, and Obsidian cannot hot-reload community plugin changes — on iOS that means a full restart. With 194 MB of plugin files, seven of them desktop-only, it happens constantly.

1. **Settings → Files and links → Override config folder** → `.obsidian-mobile`
2. Force-quit Obsidian and reopen the vault.
3. Install only the plugins you use on iPad: TaskNotes, Excalidraw, Day Planner, Reminder, Homepage.
4. Skip the desktop-only ones — they cannot run on iOS anyway: `latex-math`, `obsidian-advanced-slides`, `obsidian-zotero-desktop-connector`, `obsidian-citation-plugin`, `obsidian-pandoc`, `obsidian-image-toolkit`, `github-sync`.

The iPad then reads `.obsidian-mobile` and ignores everything Fit writes into `.obsidian`, so syncing stops triggering reloads. Desktop plugin parity is unaffected — that travels over Syncthing.

> [!danger] Why manual
> iCloud copies `.git` while Fit writes to it. That is how the repo ended up on a detached HEAD mid-rebase. You cannot add ignore patterns to iCloud Drive, so the only mitigation is not running git automatically there.

---

## Step 5 — Cleanup

| Item | Where | Action |
| --- | --- | --- |
| `_fit/` (10.4 MB) | ThinkPad vault | delete — Fit cache duplicate |
| `.copilot/model-catalog-cache.json` (5.7 MB) | ThinkPad vault | delete — regenerates |
| `google-drive-sync` plugin | HP, iPad | delete — disabled since 2026-10-25, holds a live OAuth token |
| `obsidian-git` plugin | HP, iPad | delete — never configured |
| Stuck rebase | HP | on the HP: `git rebase --abort` |
| `~/ezkwn-kcmvj/My Vault/.git` | ThinkPad | **leave alone** — stale copy, no longer synced |

---

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `! [rejected] ... fetch first` | another device pushed | find the second auto-writer, turn it off |
| `cannot lock ref` | two git clients on one repo | same |
| detached HEAD / mid-rebase | iCloud or Syncthing copied `.git` | on that device: `git rebase --abort`, then reset to `origin/main` |
| `ssh: Connection timed out` | different networks | Tailscale, or join the same Wi-Fi |
| Syncthing shows HP `connected: false` | HP asleep or offline | wake it, check `powercfg` |
| `sync-conflict` files | both sides edited the same note | keep one, delete the other, then resync |
| iPad app reloads after every sync | Fit writes `.obsidian`; iOS cannot hot-reload plugins | give the iPad `.obsidian-mobile` (Step 4) |

---

## Secrets to rotate

The current tree is clean, but history is not. The repo is public.

| Secret | Exposure | Action |
| --- | --- | --- |
| Fit PAT (`ghp_…`) | local history only, never pushed | revoke at <https://github.com/settings/tokens>, issue a new one |
| TaskNotes `apiAuthToken` | public history (`ff384c1`, `1733737`) | regenerate in TaskNotes settings |
| Google OAuth refresh token | public history (`7658629`) | revoke at <https://myaccount.google.com/permissions> |

> [!important] Make the repo private
> Settings → General → Danger Zone → Change visibility. Cheapest mitigation available; history purge is optional once the tokens are dead.

---

## Optional — fully seamless (Obsidian Sync)

The current design is seamless **within** each island, but the iPad still needs a manual tap, because iOS suspends background apps and Linux cannot see iCloud Drive. No configuration changes that.

The only engine that runs natively on Linux, Windows, iPad and iPhone is **Obsidian Sync**:

| | Standard | Plus |
| --- | --- | --- |
| Price | $4/mo billed yearly | $8/mo billed yearly |
| Vaults / storage | 1 / 1 GB | 10 / 10 GB |
| Max file size | **5 MB** | 200 MB |
| Version history | 1 month | 12 months |

This vault measures **237 MB** total, with `.obsidian` at **197 MB** and single files up to **34.6 MB** (`latex-math` binaries). Standard's 5 MB cap rules it out — **Plus** is required. Students get 40% off, so roughly **$4.80/mo**.

If you switch:

1. Fit off on all three machines.
2. Move the iOS vault **out of iCloud Drive** to `On My iPad/Obsidian` — Sync and iCloud on one vault is the documented way to corrupt it.
3. Remove the vault from Syncthing on ThinkPad and HP.
4. Keep GitHub as optional cold backup.
5. Enable **Installed community plugin list** and **Active community plugin list** in Sync settings.

The upside: no device has to stay awake. The iPad would receive changes with the HP shut in a drawer.
