const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const mysql = require("mysql");
const { connect } = require("../database/db.connection");
const consts = require("../constants");

const connection = connect();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Permet de kick un membre du serveur")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers)
        .addUserOption( (option) =>
            option
            .setName("membre")
            .setDescription("Membre à kick")
            .setRequired(true)
        )
        .addStringOption( (option) =>
            option
                .setName("raison")
                .setDescription("Raison du kick")
                .setRequired(true)
        ),
	async execute(interaction) {

        //get values
        const memberToKick = interaction.options.getMember("membre");
        const reason = interaction.options.getString("raison");

        //gif displayed when a member will be mute
        const kickGif = kickGifs();


        //checks the reason length to prevent database errors
        if(reason.length > 242){
            return interaction.reply({
                embeds: [{
                    title: `Erreur !`,
                    description: `La raison est trop longue.\nUne raison trop longue peut causer des problèmes dans la base de données`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }
        
        //checks if the bot gets perms to mute
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)){
            return interaction.reply({
                embeds: [{
                    title: `Erreur !`,
                    description: `Je ne possède pas les droits pour kick un membre`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }

        //disables mutes of a superior or equal rights member
        if(
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToKick.permissions.has(PermissionsBitField.Flags.BanMembers)) || 
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToKick.permissions.has(PermissionsBitField.Flags.KickMembers)) || 
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToKick.permissions.has(PermissionsBitField.Flags.MuteMembers))
        ){
            return interaction.reply({
                embeds: [{
                    title: `Commande refusée : Permissions insuffisantes`,
                    description: `Tu ne peux pas kick un membre ayant des permissions sur le serveur`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }

        //get current date
        var today = new Date();
        //add warn to database logs
        connection.connect(function(err){
            if (err) throw err;
            //Database management requests
            connection.query("INSERT INTO hellbot_sanctions(server_id, target_id, executor_id, type, reason, sanctionDate) VALUES ('"+interaction.guild+"', '"+memberToKick+"', '"+interaction.user.id+"', 'kick', '"+reason+"', '"+today.toISOString().slice(0,10)+"')", function (err, result, fields) {
                if (err) throw err;
            });
            connection.end();
        });

        //kick
        memberToKick.kick(reason).then(member => {
            const replyEmbed = new EmbedBuilder()
            .setColor(consts.EMBEDCOLOR)
            .setTitle("Expulsion")
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .addFields(
                { name: `${memberToKick.user.username}`, value : `a été expulsé de serveur` },
                { name: "Raison", value: `${reason}` }
            )
            .setImage(kickGif)
            .setTimestamp()
            .setFooter({text: consts.EMBEDFOOTER});

            interaction.reply({embeds: [replyEmbed]});
        }).catch(console.error);


        function kickGifs(){
            const kickGifs = consts.SANCTIONGIFS;
            return kickGifs[Math.floor(Math.random() * kickGifs.length)];
        }
	},
};