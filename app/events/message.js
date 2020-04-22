const logger = require(__rootdir + '/util/logger.js');
const { client, commands } = require(__rootdir + '/util/client-wrapper.js');

// This will eventually go into the config file(s)
const prefix = '!';
module.exports = (message) => {
    logger.log(`${message.member.displayName} in channel ${message.channel} at ${Date()}:\n${message.content}\n\n`);

    if (!message.content.startsWith(prefix)) {
        return;
    }
    const command = message.content.substring(1);
    if (!commands.has(command)) {
        return;
    }
    commands.get(command)(message);
};

