const { prefix, commands } = require(__rootdir + '/util/client-wrapper.js');
const tempFile = require(__rootdir + '/util/temp-file.js');

module.exports = {
    name: 'members',
    desc: 'generate list of members',
    usage: '',
    run: async (message) => {
        if (!message.guild) {
            return;
        }

        const guild = message.guild;
        if (!guild.available) {
                return;
        }

        const members = await guild.members.fetch();
        const data = [];
        members.forEach((member, id) => {
            data.push({
                nickname: member.displayName,
                username: member.user.username,
                discriminator: member.user.discriminator,
                id
            }); 
        });

        const output = [];

        output.push(['Nickname', 'Username', 'Discriminator', 'ID']);
        data.forEach(({ nickname, username, discriminator, id }) => {
            const row = [];
            row.push(nickname);
            row.push(username);
            row.push(discriminator);
            row.push(`" ${id}"`);
            output.push(row.join());
        });

        const filename = await tempFile(output.join('\n'), '.csv');
        message.channel.send('', {
            files: [
                __rootdir + '/temp/' + filename
            ]
        });
    },
};
