const Discord = require('discord.js');
const client = new Discord.Client();
const commands = new Map();

// Eventually read this from the config file(s)
const prefix = '!';
module.exports = {
    client,
    commands,
    prefix,
};
