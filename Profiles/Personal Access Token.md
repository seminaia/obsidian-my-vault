# GitHub access

Do not keep a personal access token in this note. This vault is backed by a
**public** GitHub repository (`seminaia/obsidian-my-vault`), and GitHub revokes
any token it finds in a public repo — which is exactly what happened to the old
one.

Credentials are stored outside the vault in `~/.git-credentials` by git's
`store` helper. To set or replace them, run:

```bash
./Scripts/set-github-credentials.sh
```

The script asks for your GitHub username and a fresh token, checks it with the
GitHub API, and stores it without writing it into the vault.
