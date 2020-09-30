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
        description: `You must be in a voice channel!`,
        timestamp: new Date(),
      }
    });

  const queue = client.player.getQueue(message.guild.id);

  if (!queue)
    return message.channel.send({
      embed: {
        color: embedFail,
        title: `Error!`,
        description: `Nothing is being played!`,
        timestamp: new Date(),
      }
    });

  let q = queue.songs.map((song, i) => {
      return `${i === 0 ? "**Current**" : `**#${i + 1}**`}: ${song.name}`;
    })
    .join("\n");
  message.channel.send({
    embed: { color: embedSuccess, title: `Queued Songs:`, description: `${q}`, timestamp: new Date(), }
  });
};

module.exports.config = {
  name: "queue",
  aliases: []
};
