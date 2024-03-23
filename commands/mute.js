// Commande !mute
module.exports = {
    name: 'mute',
    description: 'Mute un membre du serveur',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
        }

        if (args.length < 2) {
            return message.reply("Usage: !mute @membre temps(en minutes) [raison]");
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply("Veuillez mentionner un membre à mute !");
        }

        const muteTime = parseInt(args[1]);
        if (isNaN(muteTime) || muteTime <= 0) {
            return message.reply("Veuillez spécifier un temps valide en minutes !");
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === '🔴mute');
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: '🔴mute',
                    permissions: [],
                    reason: 'Création du rôle mute pour mute les membres',
                });
            } catch (error) {
                console.error(error);
                return message.reply("Une erreur s'est produite lors de la création du rôle !");
            }
        }

        try {
            await member.roles.add(muteRole);
            message.channel.send(`${member} a été muté pendant ${muteTime} minutes.`);
        } catch (error) {
            console.error(error);
            return message.reply("Une erreur s'est produite lors du mute du membre !");
        }

        setTimeout(async () => {
            try {
                await member.roles.remove(muteRole);
                message.channel.send(`${member} n'est plus muté.`);
            } catch (error) {
                console.error(error);
                return message.reply("Une erreur s'est produite lors du démute du membre !");
            }
        }, muteTime * 60000); 
    },
};
