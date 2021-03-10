const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Az Önce Bot Ping yedi, Sorun önemli değil merak etme. Hatayı düzelttik.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//--------------------------------KOMUTLAR-------------------------------\\

/////////
client.on("message", async msg => {
  
  
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = [
        "yarak","mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git","31","ananın amına yarak","slk"
                  ]
            if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.channel.send(`Kufur Etme !`).then(msg => msg.delete(10000));
            }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          })

///reklamengel

client.on("message", async message => {
  
  const lus = await db.fetch(`reklamengel_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Reklamı Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
client.on("messageUpdate", async message => {
  
  const lus = await db.fetch(`reklamengel_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Reklamı Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});



/////Rol Koruma
client.on("roleDelete", async role => {
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Rol Açıldı.'})
})
client.on("roleCreate", async role => {
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.delete()
}) 
//KanalKoruma

client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})


client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('ve aleykum selam kardeeeeş');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'günaydın') {
    msg.reply('günaydın');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'nasılsın') {
    msg.reply('iyiyim sen?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'iyi geceler') {
    msg.reply('iyi geceler sanada');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot') {
    msg.reply('efm ?yardım yazarak tüm komutları görebilirsin');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'muhafız') {
    msg.reply('ne ne ne');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'iyiyim') {
    msg.reply('hep iyi ol');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'iyi') {
    msg.reply('hep iyi ol');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'eyw') {
    msg.reply(':D  <3');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'amk bot') {
    msg.reply('ne diyon amk sg kullanma oç');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot bana yardım et') {
    msg.reply('?yardım');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'yardım komutu neydi') {
    msg.reply('?yardım');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'öldün mü') {
    msg.reply('dirildim');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'seni seviyorum') {
    msg.reply('bende seni evlenelim mi');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'anan') {
    msg.reply('anam yok o senin anandır xd');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tiktok') {
    msg.reply(':tiktok:');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === '?kurallar') {
    msg.reply(`küfür yasaktır +18 de dahil 

:small_orange_diamond:  kanalları amacına göre kullanmamak mute sebebidir

:large_orange_diamond: din dil ırk ayrımı yapmak yasaktır

:small_blue_diamond: kız erkek ayrımcılığı yasaktır ban sebebidir örnek : bir kıza komut öğretip erkeğe öğretmemek

:large_blue_diamond:  spam yasaktır flood yasak da yasaktı
 
 :small_orange_diamond: herkes kuralları okumuş kabul edilir ben bilmiyordum veya görmedim gibi söylemlere 
lüzum yoktur

:large_orange_diamond: Birşey söylemek sormak isteyen varsa lütfen bana dm atsın olayı chate taşımasın!!

:small_blue_diamond: Kurallara Uymayanlar Atılacaktır!!

:large_blue_diamond: Ailevi Küfür Kesinlikle Yasak! Gerisi Serbest!! 

:small_orange_diamond: Din,Dil,Irk,Siyaset Tartışmak Konuşmak Yasak!! 

:large_orange_diamond: Yetkililerle Dalga Geçmek Yasak!!

:small_blue_diamond: Reklam Atmak Yasaktır!!

:large_blue_diamond: Herhangi bir şikayetinizde modları taglemekten, mesaj atmaktan çekinmeyiniz.
 
:small_orange_diamond: caps lock açık mesaj yazmakda yasak

:large_orange_diamond: SUNUCUYA GİREN HERKES KURALLARI OKUMUŞ SAYILIR!!!`);
  }
});