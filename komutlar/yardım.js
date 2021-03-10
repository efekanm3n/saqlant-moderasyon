const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor('GREEN')
.setAuthor(`BOT YARDIM MENÜSÜ`)
.setDescription(`


:white_small_square: **=**  \`${prefix}kanal-koruma\` : **Kanal Koruma Aç/Kapat**
:white_small_square: **=**  \`${prefix}küfür-engel\`:  **Küfür Engel Aç/Kapat**
:white_small_square: **=**  \`${prefix}reklam-engel\` :  **Reklam Engel Aç/Kapat**
:white_small_square: **=**  \`${prefix}ban\`: **Belirttiğiniz Kişiyi Sunucudan Banlarsınız**
:white_small_square: **=**  \`${prefix}unban\`:  **Belirttiğiniz Kişinin Banını Kaldırırsınız**
:white_small_square: **=**  \`${prefix}istatistik\`:  **Botun İstatistiklerini Atar**
:white_small_square: **=**  \`${prefix}slowmode\`: **Yavaş mod sayı örnek: ${prefix}slowmode 5**
:white_small_square: **=** \`${prefix}temizle\`: **Belirttiğiniz sayıda mesajı siler en fazla 100**
:white_small_square: **=**  \`${prefix}ever-engel\`: **Everyone engelini aç/kapat**
:white_small_square: **=**  \`${prefix}ping\`: **Botun pingine bakarsınız**
:white_small_square: **=**  \`${prefix}yaz\`: **Bota yazı yazdırırsınız**
:white_small_square: **=**  \`${prefix}öneri\`: **Öneriniz varsa kullanın**
`)
.setImage("https://cdn.discordapp.com/attachments/775078157971488780/794111606401138698/standard_9.gif")
.setThumbnail("https://cdn.discordapp.com/emojis/790170217900670986.gif?v=1")
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['help'], 
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: 'Bizim yaptığımız bir yardım kodu.',
  usage: 'yardım'
};