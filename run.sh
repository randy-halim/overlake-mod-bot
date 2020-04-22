read -p 'Discord Bot Token: ' token
dir=${0%/*}
docker run -v "$(pwd)${dir#?}"/logs:/usr/src/app/logs -e DISCORD_TOKEN=$token discord-bot:1.0
