const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client({ intents: [ 
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES 
]});
const config = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot démarré !');
    client.user.setActivity('/foyer', { type: 'STREAMING', url: 'https://www.twitch.tv/cakalpb' });
});

client.on('messageCreate', message => {
    if (message.type === 'PINS_ADD' && message.mentions.has(client.user)) {
        message.reply(`Mon préfixe est \`${config.prefix}\`.`);
    }

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
    }
});

client.login(config.token);
//scriptbyaka