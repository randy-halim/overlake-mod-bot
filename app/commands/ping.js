module.exports = {
    name: 'ping',
    usage: 'ping',
    run: (message) => {
        message.channel.send("pong");
    }
}
