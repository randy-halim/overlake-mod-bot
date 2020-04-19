// require and config dotenv ASAP
require('dotenv').config();

// also extract the prefix
const prefix = process.env.commandPrefix;

// preload DiscordJS wrapper and client
const Discord = require('discord.js');
const client = new Discord.Client();

// preload filesystem
const fs = require('fs');
let fileStream;

client.once('ready', () => {
    console.log('Ready!');
    fs.writeFile('./log/latest.txt', Date(), function(err) {
        if (err) return console.error(err);
        console.log('log file should exist');
    });
    fileStream = fs.createWriteStream('./log/latest.txt');
    fileStream.on('close', fs.close);
    fileStream.on('error', fs.close);
});

client.on('message', message => {
    if (message.content === `${prefix}ping`) {
        message.reply(' Pong! ' + Date());
    }
});

/*
   !!!
   server message logging
   !!!
*/
// case: a message is created (sent) to the server in ANY channel
client.on('message', message => {
    fileStream.write(`${message.member.displayName} in channel ${message.channel} at ${Date()}:\n${message.content}\n\n`);
    console.log('message logged to /log/latest.txt');
});
// case: a message is edited to the server in ANY channel
client.on('messageUpdate', function(oldMessage, newMessage) {
    fileStream.write(`${oldMessage.member.displayName} in channel ${oldMessage.channel} at ${Date()} edited a message:\nold message:\n${oldMessage}\n\nnew message:\n${newMessage}\n\n`);
});


client.login(process.env.discordAPIKey);