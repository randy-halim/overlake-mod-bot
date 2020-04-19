const Discord = require("discord.js");
const client = new Discord.Client();
const enviroment = require("dotenv").config();

client.once("ready", () => {
	console.log("Ready!");
});

client.login("NjIxMTc3NTM5NzY2OTEwOTc2.XpuxXg.4eKcO6dQP9zu9spUOrrGA_YUSPA");