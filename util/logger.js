const fs = require('fs');
const schedule = require('node-schedule');
const moment = require('moment');

let fileStream;
module.exports = {
    init: () => {
        fileStream = fs.createWriteStream('./log/latest.txt', {flags:'w+'});
        schedule.scheduleJob('Hourly Empty Log', '0 * * * *', async () => {
            let data;
            try {
                data = await fs.promises.readFile('./log/latest.txt')
            } catch (err) {
                console.error(err);
                return;
            }
            let timestamp = moment().format()
            try {
                await fs.promises.writeFile(`./log/${timestamp}.txt`, data)
                fileStream.close();
                fileStream = fs.createWriteStream('./log/latest.txt', {flags:'w+'});
            } catch (err) {
                console.error(err);
                return;
            }
            console.log(`log has been dumped into ./log/${timestamp}`);
        });
    },
    log: (text) => {
        fileStream.write(text);
    }
}
