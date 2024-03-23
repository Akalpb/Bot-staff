const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warnlist',
    description: 'Affiche la liste des membres et leur nombre d\'avertissements',
    execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
        }

        const members = message.guild.members.cache.values();

        const totalWarnCounts = {};

        for (const member of members) {
            const warnCount = parseInt(member.user.settings.get('warns', 0)) || 0;
            if (!totalWarnCounts[member.user.tag]) {
                totalWarnCounts[member.user.tag] = 0;
            }
            totalWarnCounts[member.user.tag] += warnCount;
        }

        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Liste des membres et leur nombre total d\'avertissements')
            .setDescription(Object.entries(totalWarnCounts).map(([member, totalWarnCount]) => `**${member} :** ${totalWarnCount} avertissements`).join('\n'));

        message.channel.send({ embeds: [embed] });
    },
};
