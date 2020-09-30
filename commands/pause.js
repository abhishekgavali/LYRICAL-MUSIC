const Discord = require("discord.js");
const fs = require("fs");
const emotes = require("../config/emojis.json");
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";
const settings = require("../config/bot.json");
const prefix = settings.prefix;

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

  const song = await client.player.pause(message.guild.id);

  message.channel.send({
    embed: {
      color: embedSuccess,
      title: `Song Paused!`,
      description: `**${song.name}** has been paused!`,
      timestamp: new Date(),
    }
  });
};

module.exports.config = {
  name: "pause",
  aliases: []
};
