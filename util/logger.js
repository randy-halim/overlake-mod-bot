const fs = require('fs');
const schedule = require('node-schedule');
const moment = require('moment');

let fileStream;
module.exports = {
    init: () => {
        fileStream = fs.createWriteStream('./log/latest.txt', {flags:'a+'});
        fileStream.on('close', fs.close);
        fileStream.on('error', fs.close);

        schedule.scheduleJob('Hourly Empty Log', '0 * * * *', () => {
            fs.access('./log/latest.txt', (result) => {
                if (result) return console.error('uhh... couldn\'t get to the file?');
                fs.readFile('./log/latest.txt', (err, data) => {
                    if (err) return console.error(err);
                    fs.writeFile(`./log/${moment().format()}.txt`, data, (err) => {
                        if (err) return console.error(err);
                        console.log('saved log!');
                        fs.writeFile('./log/latest.txt', null);
                    });
                });
            });
            console.log(`log has been dumped into ./log/${moment().format()}`);
        });
    },
    log: (text) => {
        fileStream.write(text);
    },
};
