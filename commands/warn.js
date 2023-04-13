const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, RoleManager } = require("discord.js");
const mysql = require("mysql");
const { connect } = require("../database/db.connection");
const consts = require("../constants");

const connection = connect();

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

        //get values
        const memberToWarn = interaction.options.getMember("membre");
        const reason = interaction.options.getString("raison");

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
                    description: `Je ne possède pas les droits pour warn un membre`,
                    color: consts.EMBEDCOLOR
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
                    color: consts.EMBEDCOLOR
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
            connection.query("INSERT INTO hellbot_sanctions(server_id, target_id, executor_id, type, reason, sanctionDate) VALUES ('"+interaction.guild+"', '"+memberToWarn+"', '"+interaction.user.id+"', 'warn', '"+reason+"', '"+today.toISOString().slice(0,10)+"')", function (err, result, fields) {
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
                .setColor(consts.EMBEDCOLOR)
                .setTitle("mute")
                .setAuthor({name: `Par: ${interaction.user.username}`})
                .addFields(
                    { name: `${member.user.username}`, value : `a été réduit au silence` },
                    { name: "Durée", value: `1 heure` },
                    { name: "Raison", value: `${reason}` }
                )
                .setImage(muteGif)
                .setTimestamp()
                .setFooter({text: consts.EMBEDFOOTER});
            
                return interaction.reply({embeds: [replyEmbed]});
                
            }).catch(console.error);
        } else { //Warned member wasn't warned
            await memberToWarn.roles.add(warned);

            const warnGif = warnGifs();
    
            const replyEmbed = new EmbedBuilder()
            .setColor(consts.EMBEDCOLOR)
            .setTitle("Avertissement")
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .addFields(
                { name: `${memberToWarn.user.username}`, value : `a pris un avertissement` },
                { name: `Raison`, value : `${reason}` }
            )
            .setImage(warnGif)
            .setTimestamp()
            .setFooter({text: consts.EMBEDFOOTER});
            
            interaction.reply({embeds: [replyEmbed]});
            
            return warnedUser = setTimeout(function(){
                if(memberToWarn.roles.cache.some(role => role.name === "warned")){
                    memberToWarn.roles.remove(warned);

                    const replyEmbed = new EmbedBuilder()
                    .setColor(consts.EMBEDCOLOR)
                    .setTitle("Fin d'avertissement")
                    .setDescription("Ce n'est pas une raison pour refaire n'importe quoi pour autant")
                    .addFields(
                        { name: `${memberToWarn.user.username}`, value : `a fini sa période d'avertissement` }
                    )
                    .setTimestamp()
                    .setFooter({text: consts.EMBEDFOOTER});
                    return interaction.channel.send({embeds: [replyEmbed]});
                }
            }, 5 * 24 * 60 * 60 * 1000);
            
        }



        function muteGifs(){
            const muteGifs = consts.SANCTIONGIFS;
            return muteGifs[Math.floor(Math.random() * muteGifs.length)];
        }

        function warnGifs(){
            const warnGifs = consts.WARNGIFS;
            return warnGifs[Math.floor(Math.random() * warnGifs.length)];
        }
	},
};