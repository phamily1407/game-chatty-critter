#!/bin/bash
# Run this once to install the pre-push git hook.
# Usage: bash tests/install-hooks.sh

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOK_SRC="$REPO_ROOT/.githooks/pre-push"
HOOK_DST="$REPO_ROOT/.git/hooks/pre-push"

echo "Installing pre-push regression hook..."

if [ ! -f "$HOOK_SRC" ]; then
  echo "❌ Source hook not found at: $HOOK_SRC"
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DST"
chmod +x "$HOOK_DST"

echo "✅ Hook installed at: $HOOK_DST"
echo ""
echo "From now on, every 'git push' will open the regression test"
echo "suite and ask you to confirm all tests pass before proceeding."
echo ""
echo "To uninstall: rm $HOOK_DST"
