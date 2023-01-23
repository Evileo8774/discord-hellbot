const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, RoleManager } = require("discord.js");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "161.97.78.70",
    port : "3306",
    user : "u10589_wjBzts8zih",
    password : "dtWcca+k1HH1E+2dLiCatX7K",
    database : "s10589_hellBotDatabase",
     charset : "utf8"
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Permet de mute un membre pour une certain durée")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers | PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers)
        .addUserOption( (option) =>
            option
            .setName("membre")
            .setDescription("Membre à avertir")
            .setRequired(true)
        )
        .addStringOption( (option) =>
            option
                .setName("raison")
                .setDescription("Raison de l'avertissement")
                .setRequired(true)
        ),
	async execute(interaction) {
		
        //bot's owner ID
        const ownerID = "398358008838488077";

        //get values
        const memberToWarn = interaction.options.getMember("membre");
        const reason = interaction.options.getString("raison");

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
                    description: `Je ne possède pas les droits pour warn un membre`,
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        //disables warns of a superior or equal rights member
        if(
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToWarn.permissions.has(PermissionsBitField.Flags.MuteMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToWarn.permissions.has(PermissionsBitField.Flags.KickMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToWarn.permissions.has(PermissionsBitField.Flags.BanMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers) && memberToWarn.permissions.has(PermissionsBitField.Flags.Administrator)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers) && memberToWarn.permissions.has(PermissionsBitField.Flags.KickMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers) && memberToWarn.permissions.has(PermissionsBitField.Flags.BanMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) && memberToWarn.permissions.has(PermissionsBitField.Flags.BanMembers)) ||
            (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers) && memberToWarn.permissions.has(PermissionsBitField.Flags.Administrator))
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
        const warnedLvl1 = interaction.guild.roles.cache.find(role => role.name === "warned lvl 1");
        const warnedLvl2 = interaction.guild.roles.cache.find(role => role.name === "warned lvl 2");
        const warnedLvl3 = interaction.guild.roles.cache.find(role => role.name === "warned lvl 3");
        const warnedLvl4 = interaction.guild.roles.cache.find(role => role.name === "warned lvl 4");

        if(!warned){
            interaction.guild.roles.create({
                  name: 'warned',
                  color: 0x000000,
                  reason: "Permet de savoir si l'utilisateur est averti",
            }).then(console.log("role 'warned' créé")).catch(console.error);
        }

        if(!warnedLvl1){
            interaction.guild.roles.create({
                name: 'warned lvl 1',
                color: 0x000000,
                reason: "Permet de savoir quel dureté de sanction l'utilisateur aura",
            }).then(console.log("role 'warned lvl 1' créé")).catch(console.error);
        }

        if(!warnedLvl2){
            interaction.guild.roles.create({
                name: 'warned lvl 2',
                color: 0x000000,
                reason: "Permet de savoir quel dureté de sanction l'utilisateur aura",
            }).then(console.log("role 'warned lvl 2' créé")).catch(console.error);
        }

        if(!warnedLvl3){
            interaction.guild.roles.create({
                name: 'warned lvl 3',
                color: 0x000000,
                reason: "Permet de savoir quel dureté de sanction l'utilisateur aura",
            }).then(console.log("role 'warned lvl 3' créé")).catch(console.error);
        }

        if(!warnedLvl4){
            interaction.guild.roles.create({
                name: 'warned lvl 4',
                color: 0x000000,
                reason: "Permet de savoir quel dureté de sanction l'utilisateur aura",
            }).then(console.log("role 'warned lvl 4' créé")).catch(console.error);
        }

        var warnedUser = null;

        //get current date
        var today = new Date();
        //add warn to database logs
        connection.connect(function(err){
            if (err) throw err;
            //Database management requests
            connection.query("INSERT INTO logs(guild, username, logType, logDate, reason) VALUES ('"+interaction.guild+"', '"+memberToWarn+"', 'warn', '"+today.toISOString().slice(0,10)+"', '"+reason+"')", function (err, result, fields) {
                if (err) throw err;
            });
            connection.end();
        });

        if(memberToWarn.roles.cache.some(role => role.name === "warned")){ //Warned member was warned
            var muteTimeInt, muteTimeString;

            const muteGif = muteGifs();
    
            await memberToWarn.roles.remove(warned);
    
            warnedUser = null;
    
            if(memberToWarn.roles.cache.some(role => role.name === "warned lvl 1")){
                muteTimeInt = 1 * 24 * 60 * 60 * 1000;
                muteTimeString = "1 jour";
                memberToWarn.roles.add(warnedLvl2);
                memberToWarn.roles.remove(warnedLvl1);
            } else if(memberToWarn.roles.cache.some(role => role.name === "warned lvl 2")){
                muteTimeInt = 3 * 24 * 60 * 60 * 1000;
                muteTimeString = "3 jours";
                memberToWarn.roles.add(warnedLvl3);
                memberToWarn.roles.remove(warnedLvl2);
            } else if(memberToWarn.roles.cache.some(role => role.name === "warned lvl 3")){
                muteTimeInt = 7 * 24 * 60 * 60 * 1000;
                muteTimeString = "1 semaine";
                memberToWarn.roles.add(warnedLvl4);
                memberToWarn.roles.remove(warnedLvl3);
            } else if(memberToWarn.roles.cache.some(role => role.name === "warned lvl 4")){
                muteTimeInt = 14 * 24 * 60 * 60 * 1000;
                muteTimeString = "2 semaines";
            } else {
                muteTimeInt = 1 * 60 * 60 * 1000;
                muteTimeString = "1 heure";
                memberToWarn.roles.add(warnedLvl1);
            }
    
            memberToWarn.timeout(muteTimeInt, reason).then(member => {
                
                const replyEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle("mute")
                .setAuthor({name: `Par: ${interaction.user.username}`})
                .addFields(
                    { name: `${member.user.username}`, value : `a été réduit au silence` },
                    { name: "Durée", value: `1 heure` },
                    { name: "Raison", value: `${reason}` }
                )
                .setImage(muteGif)
                .setTimestamp()
                .setFooter({text: "hellBot by @Evileo#6462"});
            
                return interaction.reply({embeds: [replyEmbed]});
                
            }).catch(console.error);
        } else { //Warned member wasn't warned
            await memberToWarn.roles.add(warned);

            const warnGif = warnGifs();
    
            const replyEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle("Avertissement")
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .addFields(
                { name: `${memberToWarn.user.username}`, value : `a pris un avertissement` },
                { name: `Raison`, value : `${reason}` }
            )
            .setImage(warnGif)
            .setTimestamp()
            .setFooter({text: "hellBot by @Evileo#6462"});
            
            interaction.reply({embeds: [replyEmbed]});
            
            return warnedUser = setTimeout(function(){
                if(memberToWarn.roles.cache.some(role => role.name === "warned")){
                    memberToWarn.roles.remove(warned);

                    const replyEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Fin d'avertissement")
                    .setDescription("Ce n'est pas une raison pour refaire n'importe quoi pour autant")
                    .addFields(
                        { name: `${memberToWarn.user.username}`, value : `a fini sa période d'avertissement` }
                    )
                    .setTimestamp()
                    .setFooter({text: "hellBot by @Evileo#6462"});
                    return interaction.channel.send({embeds: [replyEmbed]});
                }
            }, 5 * 24 * 60 * 60 * 1000);
            
        }



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

        function warnGifs(){
            const warnGifs = [
                "https://media.tenor.com/nJQmHpib6awAAAAC/obiwan-star-wars.gif",
                "https://media.tenor.com/s1GKzJi363wAAAAS/dont-make-me-do-it-eric-cartman.gif",
                "https://media.tenor.com/sEV8JFLjzekAAAAd/john-cena-cena.gif",
                "https://media.tenor.com/e9mqTyoboPcAAAAM/ill-give-you-another-chance-i-give-you-another-opportunity.gif"
            ];
            return warnGifs[Math.floor(Math.random() * warnGifs.length)];
        }
	},
};