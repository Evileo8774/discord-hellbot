const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const mysql = require("mysql");
const { connect } = require("../database/db.connection");
const consts = require("../constants");

const connection = connect();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Permet de bannir un membre du serveur")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
        .addUserOption( (option) =>
            option
            .setName("membre")
            .setDescription("Membre à bannir")
            .setRequired(true)
        )
        .addStringOption( (option) =>
            option
                .setName("raison")
                .setDescription("Raison du bannissement")
                .setRequired(true)
        ),
	async execute(interaction) {

        //get values
        const memberToBan = interaction.options.getMember("membre");
        const reason = interaction.options.getString("raison");

        //gif displayed when a member will be mute
        const banGif = banGifs();


        //checks the reason length to prevent database errors
        if(reason.length > 243){
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
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)){
            return interaction.reply({
                embeds: [{
                    title: `Erreur !`,
                    description: `Je ne possède pas les droits pour bannir un membre`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }

        //disables mutes of a superior or equal rights member
        if(
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToBan.permissions.has(PermissionsBitField.Flags.BanMembers)) || 
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToBan.permissions.has(PermissionsBitField.Flags.KickMembers)) || 
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToBan.permissions.has(PermissionsBitField.Flags.MuteMembers))
        ){
            return interaction.reply({
                embeds: [{
                    title: `Commande refusée : Permissions insuffisantes`,
                    description: `Tu ne peux pas bannir un membre ayant des permissions sur le serveur`,
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
            connection.query("INSERT INTO hellbot-sanctions(server, target, executor, type, reason, date) VALUES ('"+interaction.guild+"', '"+memberToBan+"', '"+interaction.user.id+"', 'ban', '"+reason+"', '"+today.toISOString().slice(0,10)+"')", function (err) {
                if (err) throw err;
            });
            connection.end();
        });

        //ban
        memberToBan.ban(reason).then(member => {
            const replyEmbed = new EmbedBuilder()
            .setColor(consts.EMBEDCOLOR)
            .setTitle("Bannissement")
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .addFields(
                { name: `${memberToBan.user.username}`, value : `a été banni du serveur` },
                { name: "Raison", value: `${reason}` }
            )
            .setImage(banGif)
            .setTimestamp()
            .setFooter({text: consts.EMBEDFOOTER});

            interaction.reply({embeds: [replyEmbed]});
        }).catch(console.error);


        function banGifs(){
            const banGifs = consts.SANCTIONGIFS;
            return banGifs[Math.floor(Math.random() * banGifs.length)];
        }
	},
};