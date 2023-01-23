const { SlashCommandBuilder,  PermissionsBitField, EmbedBuilder, AuditLogEvent, Events, ChannelType } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("aled")
		.setDescription("Besoin d'aide à propos d'une commande ?")
        .addStringOption( (option) =>
            option
            .setName("commande")
            .setDescription("Nom de la commande")
            .setRequired(true)
            .addChoices(
                { name: "/ban", value: "ban" },
                { name: "/kick", value: "kick" },
                { name: "/logs", value: "logs" },
                { name: "/mute", value: "mute" },
                { name: "/phasmo", value: "phasmo" },
                { name: "/ping", value: "ping" },
                { name: "/resetwarn", value: "resetwarn" },
                { name: "/unmute", value: "unmute" },
                { name: "/unwarn", value: "unwarn" },
                { name: "/voicecreate", value: "voicecreate" },
                { name: "/warn", value: "warn" }
            )
        ),
	async execute(interaction) {
		
        //bot's owner ID
        const ownerID = "398358008838488077";

        //get values
        const command = interaction.options.getString("commande");

        var replyEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle(`Aide ${command}`)
        .setAuthor({name: `Par: ${interaction.user.username}`})
        .setTimestamp()
        .setFooter({text: "hellBot by @Evileo#6462"});

        switch(command){
            case "ban":
                replyEmbed
                .setDescription("Sert à bannir un membre d'un serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits de bannissement" },
                    { name: "Requête Complète", value: "\`/ban @user raison\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification du nombre de caractères qui composent la raison (Ne doit pas dépasser 243)\n-Vérification des droits du bot\n-Vérification des droits de l'utilisateur qui exécute la commande comparé à ceux de l'utilisateur à bannir\n-Ajout des informations du bannissement dans la base de données\n-Exécution de la requête de bannissement\n-Affichage du récapitulatif de bannissement" }
                );
                break;
            case "kick":
                replyEmbed
                .setDescription("Sert à expulser un membre d'un serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits d'expulsion" },
                    { name: "Requête Complète", value: "\`/kick @user raison\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification du nombre de caractères qui composent la raison (Ne doit pas dépasser 242)\n-Vérification des droits du bot\n-Vérification des droits de l'utilisateur qui exécute la commande comparé à ceux de l'utilisateur à kick\n-Ajout des informations du kick dans la base de données\n-Exécution de la requête de kick\n-Affichage du récapitulatif de kick" }
                );
                break;
            case "logs":
                replyEmbed
                .setDescription("Sert à afficher les informations sur les sanctions subies par un membre du serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant la permission de voir les logs du serveur" },
                    { name: "Requête Complète", value: "\`/logs typeDuLog\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification des droits du bot\n-Récupération des données depuis la base de données\n-Affichage des données" }
                );
                break;
            case "mute":
                replyEmbed
                .setDescription("Sert à rendre muet un membre d'un serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits de mute" },
                    { name: "Requête Complète", value: "\`/mute @user raison\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification du nombre de caractères qui composent la raison (Ne doit pas dépasser 242)\n-Vérification des droits du bot\n-Vérification des droits de l'utilisateur qui exécute la commande comparé à ceux de l'utilisateur à mute\n-Analyse de la durée de mute (Ne peut pas dépasser 14 jours)\n-Ajout des informations du mute dans la base de données\n-Exécution de la requête de mute\n-Affichage du récapitulatif de mute" }
                );
                break;
            case "phasmo":
                replyEmbed
                .setDescription("Sert à afficher les informations sur des données du jeu **Phasmophobia**")
                .addFields(
                    { name: "Membres y ayant accès", value: "Tous" },
                    { name: "Emplacement d'exécution de la commande", value: "Catégorie phasmophobia du serveur *Hell Factory*" },
                    { name: "Requête Complète", value: "\`/phasmo typeDeRecherche nom\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification du serveur dans lequel la commande est exécutée\n-Vérification de la catégorie dans laquelle est exécutée la commande\n-Vérification des droits si le paramètre 'ALL' est sélectionné\n-Affichage des données" }
                );
                break;
            case "ping":
                replyEmbed
                .setDescription("Sert à connaître le délai d'exécution des commandes")
                .addFields(
                    { name: "Membres y ayant accès", value: "Tous" },
                    { name: "Requête Complète", value: "\`/ping\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Calcule le délai\n-Retourne le résultat" }
                );
                break;
            case "resetwarn":
                replyEmbed
                .setDescription("Sert à reset les warns d'un membre d'un serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits de mute" },
                    { name: "Requête Complète", value: "\`/resetwarn @user\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification des droits du bot\n-Vérification des droits de l'utilisateur qui exécute la commande comparé à ceux de l'utilisateur à reset\n-Vérification de l'existence des roles requis aux requêtes de warn\n-Exécution de la requête de resetwarn\n-Affichage de la confirmations du resetwarn" }
                );
                break;
            case "unmute":
                replyEmbed
                .setDescription("Sert à unmute un membre d'un serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits de mute" },
                    { name: "Requête Complète", value: "\`/unmute @user\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification des droits du bot\n-Vérification des droits de l'utilisateur qui exécute la commande comparé à ceux de l'utilisateur à unmute\n-Exécution de la requête d'unmute\n-Affichage de la confirmations de l'unmute" }
                );
                break;
            case "unwarn":
                replyEmbed
                .setDescription("Sert à unwarn un membre d'un serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits de mute" },
                    { name: "Requête Complète", value: "\`/unwarn @user\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification des droits du bot\n-Vérification des droits de l'utilisateur qui exécute la commande comparé à ceux de l'utilisateur à unwarn\n-Exécution de la requête d'unwarn\n-Affichage de la confirmations de l'unwarn" }
                );
                break;
            case "voicecreate":
                replyEmbed
                .setDescription("Sert à créer un channel vocal, qui permet lui-même de créer des channels vocaux temporels")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits de manager les channels" },
                    { name: "Requête Complète", value: "\`/voicecreate nom limite\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification des droits du bot\n-Création du channel dans la catégorie dans laquelle la commande a été exécutée\n-Affichage de la confirmations de la création du channel" }
                );
                break;
            case "warn":
                replyEmbed
                .setDescription("Sert à avertir le membre d'un serveur")
                .addFields(
                    { name: "Membres y ayant accès", value: "Ceux ayant des droits de mute" },
                    { name: "Requête Complète", value: "\`/warn @user raison\`" },
                    { name: "Déroulement d'exécution détaillé", value: "-Vérification du nombre de caractères qui composent la raison (Ne doit pas dépasser 242)\n-Vérification des droits du bot\n-Vérification des droits de l'utilisateur qui exécute la commande comparé à ceux de l'utilisateur à mute\n-Vérification de l'existence des roles requis aux requêtes de warn\n-Ajout des informations du warn dans la base de données\n-Exécution de la requête de warn\n-Affichage du récapitulatif du warn" }
                );
                break;
            default:
                return interaction.reply(`<@${ownerID}>, new Error !\nRequest: \`/aled @${command}\``);
        }
            
        return interaction.reply({embeds: [replyEmbed]});
            
	},
};