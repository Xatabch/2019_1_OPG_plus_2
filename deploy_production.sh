#!/usr/bin/env bash
set -euo pipefail

ssh -i ~/.ssh/deploy_key "${PRODUCTION_MACHINE_USERNAME}@${PRODUCTION_MACHINE_ADDRESS}" << 'EOF'
cd front
echo "Aquiring fresh version of repo..." && git checkout production
echo "Pulling changes..." && git pull
echo "NPM Install..." && npm install
echo "Restarting service..." && sudo systemctl restart colors-front
echo "Successfully deployed!"
exit
EOF
