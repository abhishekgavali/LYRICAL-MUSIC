const emotes = require("../config/emojis.json");
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";

module.exports.run = async (client, message) => {
  if (!message.member.voice.channel)
    return message.channel.send({
      embed: {
        color: embedFail,
        description: `You must be in a voice channel!`
      }
    });

  if (!client.player.isPlaying(message.guild.id))
    return message.channel.send({
      embed: { color: embedFail, description: `Nothing is being played!` }
    });

  const repeatMode = client.player.getQueue(message.guild.id).repeatMode;

  if (repeatMode) {
    client.player.setRepeatMode(message.guild.id, false);
    return message.channel.send({
      embed: { color: embedSuccess, description: `Repeat mode got disabled!` }
    });
  } else {
    client.player.setRepeatMode(message.guild.id, true);
    return message.channel.send({
      embed: { color: embedSuccess, description: `Repeat mode got enabled!` }
    });
  }
};

module.exports.config = {
  name: "loop",
  aliases: ["repeat"]
};
