const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const mysql = require("mysql");
const { connect } = require("../database/db.connection");
const consts = require("../constants");

const connection = connect();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Permet de réduire au silence un membre pour une certaine durée")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addUserOption( (option) =>
            option
            .setName("membre")
            .setDescription("Membre à mute")
            .setRequired(true)
        )
        .addIntegerOption( (option) =>
            option
                .setName("duree")
                .setDescription("Durée du mute")
                .setRequired(true)
        )
        .addStringOption( (option) =>
            option
                .setName("unite")
                .setDescription("Unité de temps")
                .setRequired(true)
                .addChoices(
                    { name: "secondes", value: "sec" },
                    { name: "minutes", value: "min" },
                    { name: "heures", value: "h" },
                    { name: "jours", value: "j" },
                    { name: "semaines", value: "sem" }
                )
        )
        .addStringOption( (option) =>
            option
                .setName("raison")
                .setDescription("Raison du mute")
                .setRequired(true)
        ),
	async execute(interaction) {

        //get values
        const memberToMute = interaction.options.getMember("membre");
        const muteLength = interaction.options.getInteger("duree");
        var timeUnity = interaction.options.getString("unite");
        const reason = interaction.options.getString("raison");

        //gif displayed when a member will be mute
        const muteGif = muteGifs();


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
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.MuteMembers)){
            return interaction.reply({
                embeds: [{
                    title: `Erreur !`,
                    description: `Je ne possède pas les droits pour mute un membre`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }

        //disables mutes of a superior or equal rights member
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
                    description: `Tu ne peux pas mute un membre ayant un rôle égal ou supérieur au tien`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }

        var muteDuration = muteLength

        //data analysis
        switch(timeUnity){
            case "sec":
                if(muteLength > 1209600){
                    return interaction.reply({
                        embeds: [{
                            title: `Commande refusée : Durée de mute trop longue`,
                            description: `La durée de mute maximale est de 1209600 secondes`,
                            color: consts.EMBEDCOLOR
                        }],
                        ephemeral: true
                    });
                }

                if(muteLength > 1) timeUnity = "secondes";
                else timeUnity = "seconde";
                //converts in seconds
                muteDuration = muteDuration * 1000;
                break;
            case "min":
                if(muteLength > 20160){
                    return interaction.reply({
                        embeds: [{
                            title: `Commande refusée : Durée de mute trop longue`,
                            description: `La durée de mute maximale est de 20160 minutes`,
                            color: consts.EMBEDCOLOR
                        }],
                        ephemeral: true
                    });
                }

                if(muteLength > 1) timeUnity = "minutes";
                else timeUnity = "minute";
                //converts in minutes
                muteDuration = muteDuration * 60 * 1000;
                break;
            case "h":
                if(muteLength > 336){
                    return interaction.reply({
                        embeds: [{
                            title: `Commande refusée : Durée de mute trop longue`,
                            description: `La durée de mute maximale est de 336 heures`,
                            color: consts.EMBEDCOLOR
                        }],
                        ephemeral: true
                    });
                }

                if(muteLength > 1) timeUnity = "heures";
                else timeUnity = "heure";
                //converts in minutes
                muteDuration = muteDuration * 60 * 60 * 1000;
                break;
            case "j":
                if(muteLength > 14){
                    return interaction.reply({
                        embeds: [{
                            title: `Commande refusée : Durée de mute trop longue`,
                            description: `La durée de mute maximale est de 14 jours`,
                            color: consts.EMBEDCOLOR
                        }],
                        ephemeral: true
                    });
                }

                if(muteLength > 1) timeUnity = "jours";
                else timeUnity = "jour";
                //converts in minutes
                muteDuration = muteDuration * 24 * 60 * 60 * 1000;
                break;
            case "sem":
                if(muteLength > 2){
                    return interaction.reply({
                        embeds: [{
                            title: `Commande refusée : Durée de mute trop longue`,
                            description: `La durée de mute maximale est de 2 semaines`,
                            color: consts.EMBEDCOLOR
                        }],
                        ephemeral: true
                    });
                }

                if(muteLength > 1) timeUnity = "semaines";
                else timeUnity = "semaine";
                //converts in minutes
                muteDuration = muteDuration * 7 * 24 * 60 * 60 * 1000;
                break;
            default: //If an error occurs, mention the bot owner
                return interaction.reply(`new Error !\nRequest: \`/mute @${memberToMute.username} ${muteLength} ${timeUnity} ${reason}\``);

        }

        //get current date
        var today = new Date();
        //add warn to database logs
        connection.connect(function(err){
            if (err) throw err;
            //Database management requests
            connection.query("INSERT INTO hellbot-sanctions(server, target, executor, type, reason, date) VALUES ('"+interaction.guild+"', '"+memberToMute+"', '"+interaction.user.id+"', 'mute', '"+reason+"', '"+today.toISOString().slice(0,10)+"')", function (err, result, fields) {
                if (err) throw err;
                connection.end();
            });
        });

        //timeout
        memberToMute.timeout(muteDuration, reason).then(member => {
            const replyEmbed = new EmbedBuilder()
            .setColor(consts.EMBEDCOLOR)
            .setTitle("mute")
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .addFields(
                { name: `${memberToMute.user.username}`, value : `a été réduit au silence` },
                { name: "Durée", value: `${muteLength} ${timeUnity}` },
                { name: "Raison", value: `${reason}` }
            )
            .setImage(muteGif)
            .setTimestamp()
            .setFooter({text: consts.EMBEDFOOTER});

            interaction.reply({embeds: [replyEmbed]});
        }).catch(console.error);


        function muteGifs(){
            const muteGifs = consts.SANCTIONGIFS;
            return muteGifs[Math.floor(Math.random() * muteGifs.length)];
        }
	},
};