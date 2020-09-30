const Discord = require("discord.js");
const emotes = require("../config/emojis.json");
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";
const settings = require("../config/bot.json");
const prefix = settings.prefix;
const client = new Discord.Client();

module.exports.run = async (client, message) => {
  if (!message.member.voice.channel)
    return message.channel.send({
      embed: {
        color: embedFail,
        title: `Unable to Execute!`,
        description: `You must be in a voice channel in order to use the command`,
        timestamp: new Date(),
      }
    });

  if (!client.player.isPlaying(message.guild.id))
    return message.channel.send({
      embed: {
        color: embedFail,
        title: `Error!`,
        description: `Nothing is being played!`,
        timestamp: new Date(),
      }
    });

  client.player.stop(message.guild.id);

  message.channel.send({
    embed: {
      color: embedSuccess,
      title: `Disconnected!`,
      description: `**${client.user.username}** has successfully disconnected!`,
      timestamp: new Date(),
    }
  });
};

module.exports.config = {
  name: "stop",
  aliases: []
};
