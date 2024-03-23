// Importation des modules nécessaires
const { Permissions } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Démuter un membre du serveur',
    execute(message, args) {
        if (!message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
            const allowedRole = message.guild.roles.cache.get('1219756550017650850'); // Id du role autorisé a faire les commandes
            if (!allowedRole || !message.member.roles.cache.has(allowedRole.id)) {
                return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
            }
        }    

        if (!args.length) {
            return message.reply("Usage: !unmute @membre");
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply("Veuillez mentionner un membre à démuter !");
        }

        const muteRole = message.guild.roles.cache.find(role => role.name === '🔴mute');
        if (!muteRole || !member.roles.cache.has(muteRole.id)) {
            return message.reply(`${member} n'est pas muté.`);
        }

        member.roles.remove(muteRole)
            .then(() => {
                message.channel.send(`${member} a été démuté.`);
            })
            .catch(error => {
                console.error(error);
                message.reply("Une erreur s'est produite lors du démuting du membre !");
            });
    },
};
