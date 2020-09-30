const emotes = require("../config/emojis.json");
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";
const settings = require("../config/bot.json");
const prefix = settings.prefix;

module.exports.run = async (client, message) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel
      .send({
        embed: {
          color: embedFail,
          title: `Lack of Permission!`,
          description:
            "You must have the following permission to use this command: `MANAGE SERVER`",
          timestamp: new Date(),
        }
      });

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

  client.player.clearQueue(message.guild.id);

  message.channel.send({
    embed: {
      color: embedSuccess,
      title: `Queue cleared!`,
      description: `Do **${prefix}play** to add songs into the queue.`,
      timestamp: new Date(),
    }
  });
};

module.exports.config = {
  name: "clear-queue",
  aliases: ["cq"]
};
