const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setDescription("Bu Komutu Kullanamassın")
        .setColor("BLACK");

      message.channel.send(embed);
      return;
    }
    if (!message.guild) {
      const ozelmesajuyari = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(
          ":warning: Uyarı :warning:",
          "`ban` adlı komutu özel mesajlarda kullanamazsın."
        );
      return message.author.sendEmbed(ozelmesajuyari);
    }
    let guild = message.guild;
    let reason = args.slice(1).join(" ");
    let user = message.mentions.users.first();
    if (reason.length < 1) return message.reply("Ban sebebini yazmalısın.");
    if (message.mentions.users.size < 1)
      return message
        .reply("Kimi banlayacağını yazmalısın.")
        .catch(console.error);

    if (!message.guild.member(user).bannable)
      return message.reply("Yetkilileri banlayamam.");
    message.guild.members.ban(user);

    const embed = new Discord.MessageEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("Eylem:", "Sunucudan Yasaklama :bangbang: ")
      .addField(
        "Yasaklanan Kullanıcı:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "Yasaklayan Yetkili:",
        `${message.author.username}#${message.author.discriminator}`
      )
      .addField("Yasaklama Sebebi:", reason);
  }



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["Ban"],
  permLevel: 0
};

exports.help = {
  name: "ban",
  description: "İstediğiniz kişiyi sunucudan yasaklar.",
  usage: "ban [kullanıcı] [sebep]"
};