module.exports = {
    name: 'ping',
    desc: 'Pings the bot to ensure it is responsive.',
    usage: '',
    run: (message) => {
        message.reply('pong!');
    },
};
