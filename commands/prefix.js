const Discord = require("discord.js");
const fs = require("fs");
const settings = require("../config/bot.json");
const prefix = settings.prefix;

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message
      .reply("Sorry you can't do that!")
      .then(msg => msg.delete(3000));
  if (!args[0])
    var embed2 = new Discord.MessageEmbed()
      .setFooter(`Current Prefix: ${prefix}`)
      .setColor("RED")
      .setAuthor(
        `Prefix Error!`,
        "https://cdn.discordapp.com/emojis/671444290102362141.gif?v=1"
      )
      .setDescription(`Usage: \`\`${prefix}prefix [Custom Prefix]\`\``);
  return message.channel.send(embed2);
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
    if (err) console.log(err);
  });
  console.log(args[0]);
};

module.exports.config = {
  name: "prefix",
  aliases: ["setprefix"]
};
