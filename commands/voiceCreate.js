const { SlashCommandBuilder,  PermissionsBitField, EmbedBuilder, AuditLogEvent, Events, ChannelType } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("voicecreate")
		.setDescription("Permet de créer un salon vocal qui crée des salons vocaux")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
        .addStringOption( (option) =>
            option
            .setName("nom")
            .setDescription("Nom du channel")
            .setRequired(true)
        )
        .addIntegerOption( (option) =>
        option
        .setName("limite")
        .setDescription("0 Si aucune limite n'est souhaitée")
        .setRequired(true)
        ),
	async execute(interaction) {
		
        //bot's owner ID
        const ownerID = "398358008838488077";

        //get values
        const channelName = interaction.options.getString("nom");
        const channelLimit = interaction.options.getInteger("limite");
        const channelParent = interaction.channel.parent.id;
        
        //checks if the bot gets perms to mute
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)){
            return interaction.reply({
                embeds: [{
                    title: `Erreur !`,
                    description: `Je ne possède pas les droits pour créer des channels`,
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        interaction.guild.channels.create({
            name: `${channelName}`,
            parent: channelParent,
            type: ChannelType.GuildVoice,
            userLimit: channelLimit,
            bitrate: 66665
        });

        const replyEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle(`Le salon vocal ${channelName} a bien été créé`)
        .setAuthor({name: `Par: ${interaction.user.username}`})
        .setTimestamp()
        .setFooter({text: "hellBot by @Evileo#6462"});

        console.log(`Le channel ${channelName} a bien été créé`);
            
        return interaction.reply({embeds: [replyEmbed]});
            
	},
};