module.exports = {
    name: 'unlock',
    description: 'Déverrouille le salon actuel',
    execute(message, args) {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
        }

        if (!message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true })
                .then(() => {
                    message.channel.send("Le salon a été déverrouillé.");
                })
                .catch(error => {
                    console.error(error);
                    message.reply("Une erreur s'est produite lors du déverrouillage du salon !");
                });
        } else {
            message.reply("Le salon est déjà déverrouillé !");
        }
    },
};
