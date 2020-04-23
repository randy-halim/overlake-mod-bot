const { prefix, commands } = require(__rootdir + '/util/client-wrapper.js');
module.exports = {
    name: 'help',
    desc: 'Get descriptions and usages of commands',
    usage: '',
    run: (message) => {
        const embed = { title: 'Commands', fields:[] };
        commands.forEach((command) => {
            const value = `${command.desc}`;
            const name = `${prefix}${command.name} ${command.usage}`;
            embed.fields.push({ name, value });
        });
        message.channel.send({ embed });
    },
};
