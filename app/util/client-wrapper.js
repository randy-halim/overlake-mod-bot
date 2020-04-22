const Discord = require('discord.js');
const client = new Discord.Client();
const commands = new Map();
const prefix = '!';

// Eventually read this from the config file(s)
module.exports = {
    client,
    commands,
    prefix
};
