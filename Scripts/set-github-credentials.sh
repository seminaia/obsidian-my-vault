#!/usr/bin/env bash
# Store GitHub HTTPS credentials for this vault so git stops prompting.
# The token is written to ~/.git-credentials (plain text, mode 600) by
# git's "store" helper. Never put the token in a vault note.
#
# Usage: ./Scripts/set-github-credentials.sh
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(dirname -- "$SCRIPT_DIR")"

read -rp "GitHub username: " GH_USER
read -rsp "GitHub personal access token (classic, repo scope): " GH_TOKEN
echo

if [[ -z "$GH_USER" || -z "$GH_TOKEN" ]]; then
  echo "Username and token are both required." >&2
  exit 1
fi

code=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $GH_TOKEN" https://api.github.com/user)
if [[ "$code" != "200" ]]; then
  echo "GitHub rejected that token (HTTP $code). Create a new one at:" >&2
  echo "  https://github.com/settings/tokens" >&2
  exit 1
fi

git config --global credential.helper store
printf 'protocol=https\nhost=github.com\nusername=%s\npassword=%s\n\n' \
  "$GH_USER" "$GH_TOKEN" | git credential approve

echo "Credentials stored for github.com."
echo "Checking push access (dry run)..."
if git -C "$VAULT_DIR" push --dry-run obsidian-my-vault master:main; then
  echo "Push access OK. You can push from Obsidian Git or with:"
  echo "  git -C \"$VAULT_DIR\" push obsidian-my-vault master:main"
else
  echo "Credentials were stored, but the dry-run push failed. Check the token's" >&2
  echo "'repo' scope and that you have write access to the repository." >&2
  exit 1
fi
