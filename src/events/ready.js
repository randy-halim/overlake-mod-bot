const logger = require('../service/chat-log');

module.exports = () => {
	const message = `Ready at ${Date()}`;
	logger.log(`${message}\n`);
	console.log(message);
}