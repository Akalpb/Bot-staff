const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    execute(message, args, commands) {
        const embed = new MessageEmbed()
            .setColor('#2B2D31')
            .setTitle('Liste des commandes disponibles')
            .setDescription('Voici la liste des commandes disponibles pour ce bot :')
            .addField('!mute', 'Mute un membre du serveur')
            .addField('!unmute', 'Démuter un membre du serveur')
            .addField('!mutelist', 'Affiche la liste des membres mutés')
            .addField('!warn', 'Avertir un membre')
            .addField('!unwarn', 'Retirer un avertissement à un membre')
            .addField('!lock', 'lock')
            .addField('!unlock', 'unlock')
            .addField('!dmdban', 'demande de ban une perssone (!dmdban @user + raison)');

        embed.setFooter(`bot staff`);

        message.channel.send({ embeds: [embed] });
    },
};
