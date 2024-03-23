const { MessageEmbed } = require('discord.js');

// Commande !mutelist
module.exports = {
    name: 'mutelist',
    description: 'Affiche la liste des membres mutés',
    execute(message, args) {
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
        }

        const muteRole = message.guild.roles.cache.find(role => role.name === '🔴mute');
        if (!muteRole) {
            return message.reply("Aucun membre n'est actuellement muté.");
        }

        const mutedMembers = message.guild.members.cache.filter(member => member.roles.cache.has(muteRole.id));

        if (mutedMembers.size === 0) {
            return message.channel.send("Aucun membre n'est actuellement muté.");
        }

        const embed = new MessageEmbed()
            .setColor('#2B2D31')
            .setTitle('Membres mutés')
            .setDescription(mutedMembers.map(member => member.user.tag).join('\n'));

        message.channel.send({ embeds: [embed] });
    },
};
