const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'dmdban',
    description: 'Crée un salon pour discuter du bannissement avec l\'utilisateur mentionné',
    async execute(message, args) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
        }

        const userToBan = message.mentions.members.first();
        if (!userToBan) {
            return message.reply("Veuillez mentionner l'utilisateur à bannir !");
        }

        const banCategory = await message.guild.channels.create('Bannissements', {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: userToBan.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ]
        });

        const banChannel = await message.guild.channels.create('bannissement', {
            type: 'GUILD_TEXT',
            parent: banCategory,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: userToBan.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ]
        });

        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Demande de bannissement')
            .setDescription(`Demande de bannissement par : ${message.author}\nUtilisateur à bannir : ${userToBan}\nRaison : ${args.slice(1).join(' ')}`)
            .setTimestamp();

        const msg = await banChannel.send({ embeds: [embed] });

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('confirm_ban')
                    .setLabel('✅')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('cancel_ban')
                    .setLabel('❌')
                    .setStyle('DANGER')
            );

        await msg.edit({ components: [row] });

        const logChannel = message.guild.channels.cache.get('1220461442352939139');
        if (logChannel) {
            const logEmbed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Demande de ban acceptée')
                .setDescription(`Demande de ban par : ${message.author}\nUtilisateur banni : ${userToBan}\nRaison : ${args.slice(1).join(' ')}`)
                .setTimestamp();

            logChannel.send({ embeds: [logEmbed] });
        }
    },
};
