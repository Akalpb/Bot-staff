const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'Avertit un membre avec une raison donnée',
    execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
        }

        if (args.length < 2) {
            return message.reply("Usage: !warn @membre raison");
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply("Veuillez mentionner un membre à avertir !");
        }

        const reason = args.slice(1).join(' ');

        member.send({ embeds: [createWarnEmbed(member.user, message.author, reason)] })
            .then(() => {
                const logChannel = message.guild.channels.cache.get('1220461442352939139'); //salon ou les log s'envoie 
                if (logChannel) {
                    logChannel.send(`L'utilisateur ${member} a bien reçu l'avertissement.`);
                    logChannel.send({ embeds: [createWarnEmbed(member.user, message.author, reason)] });
                } else {
                    console.error("Le salon de log n'a pas été trouvé.");
                    message.reply("Impossible de trouver le salon de log pour enregistrer l'avertissement.");
                }
            })
            .catch(error => {
                console.error(`Impossible d'envoyer un message DM à ${member.user.tag}.\n`, error);
                message.reply("Impossible d'envoyer un message DM à cet utilisateur.");
            });

        const warnCount = (parseInt(member.user.settings.get('warns', 0)) || 0) + 1;
        member.user.settings.set('warns', warnCount);

        message.channel.send(`L'utilisateur ${member.user.tag} a été averti pour la raison suivante : ${reason}\nNombre total d'avertissements : ${warnCount}`);
    },
};

function createWarnEmbed(warnedUser, moderator, reason) {
    return new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Avertissement')
        .setDescription(`**Utilisateur averti :** ${warnedUser.tag}\n**Par :** ${moderator.tag}\n**Raison :** ${reason}`);
}
