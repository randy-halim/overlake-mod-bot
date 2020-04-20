const logger = require(__rootdir + '/util/logger.js');
module.exports = (message) => {
    logger.log(`${message.member.displayName} in channel ${message.channel} at ${Date()}:\n${message.content}\n\n`);
}

