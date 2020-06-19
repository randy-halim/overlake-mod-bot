const fs = require('fs');
const { scheduleJob } = require('node-schedule');
const moment = require('moment');

const logPath = `${__dirname}/../logs`; // TODO: Move to external logs
let fileStream = fs.createWriteStream(`${logPath}/latest.txt`, { flags: 'w+' });

module.exports = {
	log: text => fileStream.write(text),
	begin: () => {
		console.log('starting logger service...');
		scheduleJob('Empty Log Hourly', '0 * * * *', async () => {
			let data;

			try {
				data = await fs.promises.readFile(`${logPath}/latest.txt`);
			}
			catch (err) {
				console.error(err);
				return;
			}

			const timestamp = moment().format();

			try {
				await fs.promises.writeFile(`${logPath}/${timestamp}.txt`, data);
				fileStream.close();
				fileStream = fs.createWriteStream(`${logPath}/latest.txt`, { flags: 'w+' });
			}
			catch (err) {
				console.error(err);
				return;
			}

			console.log(`log dumped into '${logPath}/${timestamp}`);
		});

		console.log('logger service ready!');
	}
};