const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "192.168.1.22",
    port : "3306",
    user : "hellbot",
    password : "hellbot",
    database : "discord-hellbot",
    charset : "utf8"
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Permet de mute un membre pour une certain durée")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers | PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers)
        .addUserOption( (option) =>
            option
            .setName("membre")
            .setDescription("Membre à mute")
            .setRequired(true)
        )
        .addIntegerOption( (option) =>
            option
                .setName("duree")
                .setDescription("Durée en chiffre du mute")
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
                    color: 0xFF0000
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
                    color: 0xFF0000
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
                    color: 0xFF0000
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
                            color: 0xFF0000
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
                            color: 0xFF0000
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
                            color: 0xFF0000
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
                            color: 0xFF0000
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
                            color: 0xFF0000
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
            connection.query("INSERT INTO sanctions(server, target, executor, type, reason, date) VALUES ('"+interaction.guild+"', '"+memberToMute+"', '"+interaction.user.id+"', 'mute', '"+reason+"', '"+today.toISOString().slice(0,10)+"')", function (err, result, fields) {
                if (err) throw err;
                connection.end();
            });
        });

        //timeout
        memberToMute.timeout(muteDuration, reason).then(member => {
            const replyEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle("mute")
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .addFields(
                { name: `${memberToMute.user.username}`, value : `a été réduit au silence` },
                { name: "Durée", value: `${muteLength} ${timeUnity}` },
                { name: "Raison", value: `${reason}` }
            )
            .setImage(muteGif)
            .setTimestamp()
            .setFooter({text: "hellBot by @Evileo#6462"});

            interaction.reply({embeds: [replyEmbed]});
        }).catch(console.error);


        function muteGifs(){
            const muteGifs = [
                "https://media.tenor.com/zJe691uJBtYAAAAC/conasse-french.gif",
                "https://media.tenor.com/Wc65eDfmz6AAAAAC/nelson-monfort-cheh.gif",
                "https://media.tenor.com/DYCMu6qWQ6YAAAAC/si.gif",
                "https://media.tenor.com/eetzAgtvRjYAAAAC/nounours-et-hop.gif",
                "https://media.tenor.com/BFzP3l4rZYMAAAAC/fuck-meme.gif",
                "https://media.tenor.com/8IH9VnkjAFkAAAAC/oss117-oss.gif",
                "https://media.tenor.com/I2x1XSezVDcAAAAC/chandler-bing-shut-up.gif",
                "https://media.tenor.com/ZpBMkWyufhMAAAAC/dead.gif",
                "https://media.tenor.com/NUC6WS9g8UoAAAAC/shrug-idk.gif",
                "https://media.tenor.com/lwScjCRTln8AAAAS/smile-and.gif",
                "https://media.tenor.com/w6NNS1UO3aIAAAAS/gg-ez.gif",
                "https://media.tenor.com/Q4tVC2cL_woAAAAd/noot-noot-apocalypse.gif",
                "https://media.tenor.com/MF_bsgoG43cAAAAC/thanos-snap.gif",
                "https://media.tenor.com/XyArQpDNunUAAAAC/anime-move.gif",
                "https://media.tenor.com/tt7Yzf77Ud8AAAAC/kicking-out-get-out.gif",
                "https://media.tenor.com/ympsbKA-XYkAAAAd/asdf-asdf-movie.gif",
                "https://media.tenor.com/LdG-fLYBipAAAAAC/fairy-godmother-cinderella.gif",
                "https://media.tenor.com/xc3PWSsktLkAAAAS/mordekaiser-league-of-legends.gif",
                "https://media.tenor.com/IPknstu80QwAAAAC/marilyn-monroe-bye.gif",
                "https://media.tenor.com/ryZ0GRPwIe4AAAAS/teenage-mutant-ninja-turtles-i-deliver-a-message.gif",
                "https://media.tenor.com/sxm29TTnN3sAAAAC/disney-encanto.gif",
                "https://media.tenor.com/DdcZwwBeE7EAAAAC/ferme-ta-gueule-ta-gueule.gif",
                "https://media.tenor.com/D0dAcRTsGPkAAAAS/theobabac-hop-la.gif",
                "https://media.tenor.com/vwLzquMgQMcAAAAC/bonne-nuit-les-petits-bonne-nuit-les-petits-nounours.gif",
                "https://media.tenor.com/rU4fEQGG3YwAAAAd/judge-kiss.gif",
                "https://media.tenor.com/qxk2ij3rK4sAAAAd/antoine-daniel.gif",
                "https://media.tenor.com/PXAd4Skk3aQAAAAd/vilebrequin-vilebrequin-sylvain-levy.gif",
                "https://media.tenor.com/a4jfpWlUHJ0AAAAC/vilebrequin-sylvain-levy.gif",
                "https://media.tenor.com/j5kRY0ezLqAAAAAC/karma-smackback.gif",
                "https://media.tenor.com/aafuz_hrk54AAAAC/toi-t-ban-streamer.gif",
                "https://media.tenor.com/T25sEEchNTIAAAAd/disappear-pppoof.gif",
                "https://media.tenor.com/xPiy9cJaMFoAAAAd/sparta-kick.gif",
                "https://media.tenor.com/j7mHCPcX-8YAAAAS/begone-thot-begone.gif",
                "https://media.tenor.com/COUrq712aGMAAAAd/floppa-caracal.gif",
                "https://media.tenor.com/Ekjt1JpWIN0AAAAC/slap-in-the-face-mad.gif",
                "https://media.tenor.com/nSEgedPqQ0gAAAAd/live-live-live-die-vive-vive-vive-muere.gif",
                "https://media.tenor.com/YZLXIfXfio8AAAAC/ntm-tchoupi.gif",
                "https://media.tenor.com/tEF3CtfIsG8AAAAd/skyrim-dovahkiin.gif",
                "https://media.tenor.com/BcG7CYvt5-YAAAAd/lovyyn-tu-vas-aller-en-enfer.gif",
                "https://media.tenor.com/9zCgefg___cAAAAC/bane-no.gif",
                "https://media.tenor.com/CyHKquZt2OYAAAAC/yes-oh.gif",
                "https://media.tenor.com/tuRxIBK9DvkAAAAC/jump-nique-ta-mere.gif",
                "https://media.tenor.com/PXOlIv7bdkIAAAAd/cat-squishy.gif",
                "https://media.tenor.com/ZSJLwa8pRVoAAAAd/bonk-shibe.gif"
            ];
            return muteGifs[Math.floor(Math.random() * muteGifs.length)];
        }
	},
};