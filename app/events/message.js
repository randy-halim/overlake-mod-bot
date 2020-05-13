const logger = require(__rootdir + '/util/logger.js');
module.exports = (message) => {
    logger.log(`${message.member.displayName} in channel ${message.channel} at ${Date()}:\n${message.content}\n\n`);
<<<<<<< HEAD

    if (!message.content.startsWith(prefix)) {
        return;
    }
    const command = message.content.split(' ')[0].substring(1);
    if (!commands.has(command)) {
        return;
    }
    commands.get(command).run(message);
=======
>>>>>>> 32aff41824562ca27f4036871af2a1deba0d6c42
};

