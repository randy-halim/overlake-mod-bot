const fs = require('fs');
const schedule = require('node-schedule');
const moment = require('moment');
const logPath = __rootdir + '/../logs';

// Setup write stream
let fileStream = fs.createWriteStream(`${logPath}/latest.txt`, { flags:'w' });


module.exports = {
    log: (text) => {
        fileStream.write(text);
    },
    begin: () => {
        schedule.scheduleJob('Hourly Empty Log', '0 * * * *', async () => {
            let data;
            try {
                data = await fs.promises.readFile(`${logPath}/latest.txt`);
            } catch (err) {
                console.error(err);
                return;
            }
            const timestamp = moment().format();
            try {
                await fs.promises.writeFile(`${logPath}/${timestamp}.txt`, data);
                fileStream.close();
                fileStream = fs.createWriteStream(`${logPath}/latest.txt`, { flags:'w' });
            } catch (err) {
                console.error(err);
                return;
            }
            console.log(`log has been dumped into ${logPath}/${timestamp}`);
        });
    },
};
