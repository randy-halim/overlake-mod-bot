read -p 'Discord Bot Token: ' token
docker run -d -v "$(pwd)${0%./*}"/logs:/usr/src/app/logs -e $token discord-bot:1.0
