const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, RoleManager } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("unwarn")
		.setDescription("Permet de mute un membre pour une certain durée")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers | PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers)
        .addUserOption( (option) =>
            option
            .setName("membre")
            .setDescription("Membre à avertir")
            .setRequired(true)
        ),
	async execute(interaction) {
		
        //bot's owner ID
        const ownerID = "398358008838488077";

        //get values
        const memberToUnwarn = interaction.options.getMember("membre");
        
        //checks if the bot gets perms to mute
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.MuteMembers)){
            return interaction.reply({
                embeds: [{
                    title: `Erreur !`,
                    description: `Je ne possède pas les droits pour unwarn un membre`,
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        //disables unwarns of a superior or equal rights member
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
                    description: `Tu ne peux pas warn un membre ayant un rôle égal ou supérieur au tien`,
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        //checks presence of required roles
        const warned = interaction.guild.roles.cache.find(role => role.name === "warned");

        if(!warned){
            interaction.guild.roles.create({
                  name: 'warned',
                  color: 0x000000,
                  reason: "Permet de savoir si l'utilisateur est averti",
            }).then(console.log("role 'warned' créé")).catch(console.error);
        }

        memberToUnwarn.roles.remove(warned);
                
        const replyEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("unmute")
        .setAuthor({name: `Par: ${interaction.user.username}`})
        .addFields(
            { name: `${memberToUnwarn.user.username}`, value : `a perdu un role, dommage` }
        )
        .setTimestamp()
        .setFooter({text: "hellBot by @Evileo#6462"});
        
        return interaction.reply({embeds: [replyEmbed]});
            
	},
};