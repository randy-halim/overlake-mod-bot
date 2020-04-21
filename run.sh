read -p 'Discord Bot Token: ' token
dir=${0%/*}
docker run -d -v "$(pwd)${dir#?}"/logs:/usr/src/app/logs -e $token discord-bot:1.0
