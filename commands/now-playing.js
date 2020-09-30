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

  const song = await client.player.nowPlaying(message.guild.id);

  message.channel.send({
    embed: {
      color: embedSuccess,
      url: `${song.url}`,
      title: `Currently Playing:`,
      description: `The following Song is currently being played:`,
      fields: [
        { name: "Song Name:", value: `${song.name}` },
        { name: "Song URL:", value: `${song.url}` },
        { name: "Song Author:", value: `${song.author}` }
      ],
      timestamp: new Date(),
    }
  });
};

module.exports.config = {
  name: "now-playing",
  aliases: ["np"]
};
