const Discord = require("discord.js");
const emotes = require("../config/emojis.json");
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";
const settings = require("../config/bot.json");
const prefix = settings.prefix;

module.exports.run = async (client, message) => {
  var helpEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Song Commands | Updated!!")
    .addField(`**${prefix}play [args]/[URL]**`, "Plays the chosen Song.")
    .addField(`**${prefix}loop**`, "Loops the Current Song.")
    .addField(`**${prefix}np**`, "Shows the Current Songs.")
    .addField(`**${prefix}pause**`, "Pause the Current Song.")
    .addField(`**${prefix}queue**`, "Shows the Queued Songs. *(Listed in Order)*")
    .addField(`**${prefix}resume**`, "Resume the Current Song")
    .addField(`**${prefix}skip**`, "Skip the Current Song and Play the next Queue Song.")
    .addField(`**${prefix}cq**`, "Clears the Queued Songs. *(To prevent abuse, user needs the Manage Server permission to use this commands.)*")
    .addField(`**${prefix}stop**`, `Stop and Disconnects **${client.user.username}**`)
    .setThumbnail("https://cdn.discordapp.com/attachments/724569486329380884/725693329269850202/20190301_081502.jpg")
    .setTimestamp()
    .setFooter(`Current Bot Prefix: ${prefix}`);
  return message.channel.send(helpEmbed);
};

module.exports.config = {
  name: "songhelp",
  aliases: ["help", "cmds"]
};
