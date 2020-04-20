const fs = require('fs');
let fileStream;
module.exports = {
    init: () => {
        fileStream = fs.createWriteStream('./log/latest.txt', {flags:'a+'});
        fileStream.on('close', fs.close);
        fileStream.on('error', fs.close);
    },
    log: (text) => {
        fileStream.write(text);
    }
}
