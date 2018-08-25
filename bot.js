const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
})
}




client.on("message", (message) => {

    if (isCommand(message, "-new")) {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "◆ Host Support")) return message.channel.send(`لا يحتوي هذا الخادم على دور \ 'دعم مضيف \ "، وبالتالي لن يتم فتح التذكرة. \ n إذا كنت مسؤولاً ، فأنشئ واحدة بهذا الاسم بالضبط واعطها للمستخدمين الذين سيكون بمقدورهم رؤية تذاكر.`);
        if (message.guild.channels.exists("name", "تذكرة" + message.author.id)) return message.channel.send(`ستفتح تذكرة جديدة`);
        message.guild.createChannel(`تذكرة${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "◆ Host Support");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: تذكرتك تم فتحها #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون لدينا ** فريق الدعم ** قريباً لمساعدتك.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }


    if (isCommand(message, "-close")) {
        if (!message.channel.name.startsWith(`تذكرة`)) return message.channel.send(`لا يمكنك استخدام أمر الإغلاق خارج قناة التذاكر.`);

        message.channel.send(`هل أنت واثق؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء! \ n للتأكيد ، اكتب \ "-confirm \`. سوف ينتهي المهلة خلال 10 ثوانٍ ويتم إلغاؤها.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '-confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit('انتهى إغلاق التذاكر ، لم يتم إغلاق التذكرة.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }

});

client.login(process.env.BOT_TOKEN);
