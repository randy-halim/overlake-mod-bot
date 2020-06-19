const Discord = require('discord.js');

module.exports.client = new Discord.Client();
module.exports.commands = new Map();
module.exports.prefix = process.env.PREFIX;