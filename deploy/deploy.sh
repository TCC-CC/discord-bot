#!/bin/sh
set -e

cd "$(dirname "$0")/.."

REPO=$(git remote get-url origin | sed -E 's#^(git@github\.com:|https://github\.com/)##; s#\.git$##')
COMMIT_URL="https://github.com/$REPO/commit"

notify() {
  node --env-file=.env deploy/notify.js "$1" || true
}

git fetch --quiet origin main

OLD=$(git rev-parse HEAD)
NEW=$(git rev-parse origin/main)

if git diff --quiet --exit-code OLD NEW -- "../commands"; then
  node --env-file=.env deploy/register-commands.js
  REGISTERED_COMMANDS=$?
fi

if [ "$OLD" = "$NEW" ]; then
  exit 0
fi

notify "Pulling [\`$(git rev-parse --short "$OLD")\`]($COMMIT_URL/$OLD) -> [\`$(git rev-parse --short "$NEW")\`]($COMMIT_URL/$NEW) $(if [ `$REGISTERED_COMMANDS` -eq 0 ]; then echo "and registered commands"; fi)"

git reset --hard --quiet origin/main
npm install --omit=dev --silent

SHA=$(git rev-parse HEAD)
SHORT=$(git rev-parse --short HEAD)
SUBJECT=$(git log -1 --pretty=%s | tr -d '`@' | cut -c1-120)

if pm2 restart clubbot --update-env >/dev/null 2>&1; then
  notify "Deployed [\`$SHORT\`]($COMMIT_URL/$SHA) — $SUBJECT; bot restarted"
else
  notify "Deployed [\`$SHORT\`]($COMMIT_URL/$SHA) but pm2 restart FAILED; bot may be down?"
  exit 1
fi
