const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("unmute")
		.setDescription("Enlève le mute d'un membre")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers | PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers)
        .addUserOption( (option) =>
            option
            .setName("membre")
            .setDescription("Membre à unmute")
            .setRequired(true)
        ),
	async execute(interaction) {

        //bot's owner ID
        const ownerID = "398358008838488077";

        const memberToUnmute = interaction.options.getMember("membre");

        //checks if the bot gets perms to unmute
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.MuteMembers)){
            return interaction.reply({
                embeds: [{
                    title: `Erreur !`,
                    description: `Je ne possède pas les droits pour mute un membre`,
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        //disables unmutes of a superior or equal rights member
        if(
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToUnmute.permissions.has(PermissionsBitField.Flags.MuteMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToUnmute.permissions.has(PermissionsBitField.Flags.KickMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToUnmute.permissions.has(PermissionsBitField.Flags.BanMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToUnmute.permissions.has(PermissionsBitField.Flags.Administrator)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers) && memberToUnmute.permissions.has(PermissionsBitField.Flags.KickMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers) && memberToUnmute.permissions.has(PermissionsBitField.Flags.BanMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToUnmute.permissions.has(PermissionsBitField.Flags.BanMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers) && memberToUnmute.permissions.has(PermissionsBitField.Flags.Administrator))
        ){
            return interaction.reply({
                embeds: [{
                    title: `Commande refusée : Permissions insuffisantes`,
                    description: `Tu ne peux pas unmute un membre ayant un rôle égal ou supérieur au tien`,
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        //untimeout
        memberToUnmute.timeout(null, "unmute").then(member => {
            const replyEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle("unmute")
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .addFields(
                { name: `${memberToUnmute.user.username}`, value : `a de nouveau le droit de parler` },
            )
            .setTimestamp()
            .setFooter({text: "hellBot by @Evileo#6462"});

            return interaction.reply({embeds: [replyEmbed]});
        }).catch(console.error);
	},
};