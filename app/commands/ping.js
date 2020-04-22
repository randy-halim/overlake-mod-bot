module.exports = {
    name: 'ping',
    desc: 'Ping command',
    usage: '',
    run: (message) => {
        message.reply('pong');
    },
};
