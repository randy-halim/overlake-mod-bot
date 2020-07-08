const fs = require('fs');
const crypto = require('crypto');

module.exports = async (data, extension) => {
    const id = crypto.randomBytes(16).toString('hex');
    return await new Promise((resolve, reject) => {
        fs.writeFile(__rootdir + '/temp/' + id + extension, data, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(id + extension);
        });
    });
}
