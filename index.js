// require and config dotenv ASAP
require('dotenv').config();

// moment is a package to format Date() objects.
const moment = require('moment');

// applicationinsights for Azure
const appInsights = require('applicationinsights');
appInsights.setup(process.env.insightsInstrumentationKey).start();

// node-schedule is a package to schedule 'crontabs' in our Node application.
const crontab = require('node-schedule');

// extract const variables
const prefix = process.env.commandPrefix;
const auditChannelID = process.env.auditChannel;

// preload DiscordJS wrapper and client
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

// preload filesystem
const fs = require('fs');
let fileStream;

client.once('ready', () => {
    console.log('Ready!');
    fs.writeFile('./log/latest.txt', Date(), function(err) {
        if (err) return console.error(err);
        console.log('ʘ‿ʘ the log file \'latest.txt\' has been made!');
    });
    // TODO: Fix so if latest.log disappears, it will regenerate
    fileStream = fs.createWriteStream('./log/latest.txt');
    fileStream.on('close', fs.close);
    fileStream.on('error', fs.close);
    // 'crontab' to hourly, dump log to file and clean it
    crontab.scheduleJob('Hourly Empty Log', '0 * * * *', function() {
        fs.access('./log/latest.txt', function(result) {
            if (result) return console.error('uhh... couldn\'t get to the file?');
            fs.readFile('./log/latest.txt', function(err, data) {
                if (err) return console.error(err);
                fs.writeFile(`./log/${moment().format()}.txt`, data, function(err) {
                    if (err) return console.error(err);
                    console.log('saved log!');
                    fs.writeFile('./log/latest.txt', null);
                });
            });
        });
        console.log(`log has been dumped into ./log/${moment().format()}`);
    });
    console.log(crontab.scheduledJobs);
});

client.on('message', message => {
    if (message.content === `${prefix}ping`) {
        message.reply(`Pong! ${Date()} ʕᵔᴥᵔʔ`);
    }
});

/*
   !!!
   server message logging
   !!!
*/
// case: a message is created (sent) to the server in ANY channel
client.on('message', message => {
    if (message.author.bot) return;
    fileStream.write(`${message.member.displayName} in channel ${message.channel} at ${Date()}:\n${message.content}\n\n`);
    const channel = message.guild.channels.cache.find(ch => ch.id === auditChannelID);
    if (!channel) return console.error('¯\\_(⊙︿⊙)_/¯ i tried to find the audit log channel, but i can\'t find it!');
    const embed = new MessageEmbed()
        .setTitle('new message')
        .setColor(0x00ff00)
        .setDescription(`
        **user:** ${message.member}
        **message:**
        ${message.content}
        `)
        .setFooter(Date());
    channel.send(embed);
    console.log(`${message.member.displayName} sent a message! (｡◕‿◕｡)`);
});
// case: a message is edited to the server in ANY channel
client.on('messageUpdate', function(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;
    fileStream.write(`${oldMessage.member.displayName} in channel ${oldMessage.channel} at ${Date()} edited a message:\nold message:\n${oldMessage}\n\nnew message:\n${newMessage}\n\n`);
    const channel = oldMessage.guild.channels.cache.find(ch => ch.id === auditChannelID);
    if (!channel) return console.error('¯\\_(⊙︿⊙)_/¯ i tried to find the audit log channel, but i can\'t find it!');
    const embed = new MessageEmbed()
        .setTitle('message edited')
        .setColor(0x0000ff)
        .setDescription(`
        **user:** ${oldMessage.member}\n
        **old message:**
        ${oldMessage.content}
        **new message:**
        ${newMessage.content}
        `)
        .setFooter(Date());
    channel.send(embed);
    console.log(`${oldMessage.member.displayName} edited a message. ¯\\_(ツ)_/¯`);
});
// case: a message is deleted in the server in ANY channel
client.on('messageDelete', message => {
    if (message.author.bot) return;
    fileStream.write(`${message.member.displayName} in channel ${message.channel} at ${Date()} was deleted:\n${message.content}\n\n`);
    const channel = message.guild.channels.cache.find(ch => ch.id === auditChannelID);
    if (!channel) return console.error('¯\\_(⊙︿⊙)_/¯ i tried to find the audit log channel, but i can\'t find it!');
    const embed = new MessageEmbed()
        .setTitle('message deleted')
        .setColor(0xff0000)
        .setDescription(`
        **user:** ${message.member}\n
        **message:**
        ${message.content}
        `)
        .setFooter(Date());
    channel.send(embed);
    console.log(`${message.member.displayName} deleted a message.`);
});

client.login(process.env.discordAPIKey);