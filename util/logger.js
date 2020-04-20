const fs = require('fs');
const schedule = require('node-schedule');
const moment = require('moment');

let fileStream;
module.exports = {
    init: () => {
        fileStream = fs.createWriteStream('./data/log/latest.txt', { flags:'w+' });
        schedule.scheduleJob('Hourly Empty Log', '0 * * * *', async () => {
            let data;
            try {
                data = await fs.promises.readFile('./data/log/latest.txt');
            } catch (err) {
                console.error(err);
                return;
            }
            const timestamp = moment().format();
            try {
                await fs.promises.writeFile(`./data/log/${timestamp}.txt`, data);
                fileStream.close();
                fileStream = fs.createWriteStream('./data/log/latest.txt', { flags:'w+' });
            } catch (err) {
                console.error(err);
                return;
            }
            console.log(`log has been dumped into ./data/log/${timestamp}`);
        });
    },
    log: (text) => {
        fileStream.write(text);
    },
};
