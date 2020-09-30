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

  client.player.shuffle(message.guild.id);
  return message.channel.send({
    embed: {
      color: embedSuccess,
      title: `Queue shuffled!`,
      description: `The queue has been shuffled!`,
      timestamp: new Date(),
    }
  });
};

module.exports.config = {
  name: "shuffle",
  aliases: []
};
