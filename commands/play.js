const emotes = require("../config/emojis.json");
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";
const settings = require("../config/bot.json");
const prefix = settings.prefix;

module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send({
      embed: {
        color: embedFail,
        title: `Unable to Execute!`,
        description: `You must be in a voice channel in order to use the command`,
        timestamp: new Date(),
      }
    });

  if (!args[0])
    return message.channel.send({
      embed: {
        color: embedFail,
        title: `No Song Name!`,
        description: `Please enter Song Name!`,
        timestamp: new Date(),
      }
    });

  const aSongIsAlreadyPlaying = client.player.isPlaying(message.guild.id);

  // If there's already a song playing
  if (aSongIsAlreadyPlaying) {
    // Add the song to the queue
    const song = await client.player.addToQueue(
      message.guild.id,
      args.join(" ")
    );
    message.channel.send({
      embed: {
        color: embedSuccess,
        url: `${song.url}`,
        title: `Song Added!`,
        description: "The following Song has been added to the Queue!",
        fields: [
          { name: "Song Name:", value: `${song.name}` },
          { name: "Song URL:", value: `${song.url}` },
          { name: "Song Author:", value: `${song.author}` }
        ],
        timestamp: new Date(),
      }
    });
  } else {
    // Else, play the song
    const song = await client.player.play(
      message.member.voice.channel,
      args.join(" ")
    );
    message.channel.send({
      embed: {
        color: embedSuccess,
        url: `${song.url}`,
        title: `Now Playing!`,
        description: `The following Song is now playing:`,
        fields: [
          { name: "Song Name:", value: `${song.name}` },
          { name: "Song URL:", value: `${song.url}` },
          { name: "Song Author:", value: `${song.author}` }
        ],
        timestamp: new Date(),
      }
    });
    song.queue.on("end", () => {
      message.channel.send({
        embed: {
          color: embedFail,
          title: `Queue completed!`,
          description: `Add some more songs to play by typing **${prefix}play**`,
          timestamp: new Date(),
        }
      });
    });
  }
};

module.exports.config = {
  name: "play",
  aliases: ["p"]
};
