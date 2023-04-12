//Discord API
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

//Google API
const { google } = require('googleapis');
const creditentials = require("../creditentials.json");

const scopes = [
    'https://www.googleapis.com/auth/drive'
];

const auth = new google.auth.JWT(
    creditentials.client_email, null,
    creditentials.private_key, scopes
);

const drive = google.drive({ version: "v3", auth });

const consts = require("../constants");

//command
module.exports = {
    data: new SlashCommandBuilder()
    .setName("phasmo")
    .setDescription("Renvoie des informations sur le jeu")
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("entité")
            .setDescription("Renvoie les informations sur une entité du jeu")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'entité")
                    .setRequired(true)
                    .addChoices(
                        { name: "Esprit", value: "Esprit" },
                        { name: "Spectre", value: "Spectre" },
                        { name: "Fantôme", value: "Fantôme" },
                        { name: "Poltergeist", value: "Poltergeist" },
                        { name: "Banshee", value: "Banshee" },
                        { name: "Djinn", value: "Djinn" },
                        { name: "Cauchemar", value: "Cauchemar" },
                        { name: "Revenant", value: "Revenant" },
                        { name: "Ombre", value: "Ombre" },
                        { name: "Démon", value: "Démon" },
                        { name: "Yurei", value: "Yurei" },
                        { name: "Oni", value: "Oni" },
                        { name: "Yokai", value: "Yokai" },
                        { name: "Hantu", value: "Hantu" },
                        { name: "Goryo", value: "Goryo" },
                        { name: "Myling", value: "Myling" },
                        { name: "Onryo", value: "Onryo" },
                        { name: "Les Jumeaux", value: "Les Jumeaux" },
                        { name: "Raiju", value: "Raiju" },
                        { name: "Obake", value: "Obake" },
                        { name: "Le Mimic", value: "Le Mimic" },
                        { name: "Moroï", value: "Moroï" },
                        { name: "Deogen", value: "Deogen" },
                        { name: "Thayé", value: "Thayé" }
                    )
            )
    )
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("equipement")
            .setDescription("Renvoie les informations sur un équipement du jeu")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'équipement")
                    .setRequired(true)
                    .addChoices(
                        { name: "Bougie", value: "Bougie" },
                        { name: "Crucifix", value: "Crucifix" },
                        { name: "Projecteur D.O.T.S", value: "Projecteur D.O.T.S" },
                        { name: "Lecteur EMF", value: "Lecteur EMF" },
                        { name: "Lampes de Poche", value: "Lampes de Poche" },
                        { name: "Livre d'Écriture Fantomatique", value: "Livre d'Écriture Fantomatique" },
                        { name: "Bâton Lumineux", value: "Bâton Lumineux" },
                        { name: "Caméra Frontale", value: "Caméra Frontale" },
                        { name: "Briquet", value: "Briquet" },
                        { name: "Détecteur de Mouvements", value: "Détecteur de Mouvements" },
                        { name: "Microphone Parabolique", value: "Microphone Parabolique" },
                        { name: "Appareil Photo", value: "Appareil Photo" },
                        { name: "Sel", value: "Sel" },
                        { name: "Pilules de Santé Mentale", value: "Pilules de Santé Mentale" },
                        { name: "Bâton d'Encens", value: "Bâton d'Encens" },
                        { name: "Capteur Sonore", value: "Capteur Sonore" },
                        { name: "Spirit Box", value: "Spirit Box" },
                        { name: "Thermomètre", value: "Thermomètre" },
                        { name: "Trépied", value: "Trépied" },
                        { name: "Lampe UV", value: "Lampe UV" },
                        { name: "Caméra Vidéo", value: "Caméra Vidéo" }
                    )
            )
    )
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("equipement-van")
            .setDescription("Renvoie les informations sur un équipement du jeu présent dans le camionnette")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'équipement")
                    .setRequired(true)
                    .addChoices(
                        { name: "Tableau d'Objectifs", value: "Tableau d'Objectifs" },
                        { name: "Carte du bâtiment", value: "Carte du bâtiment" },
                        { name: "Moniteur de Santé Mentale", value: "Moniteur de Santé Mentale" },
                        { name: "Moniteur d'Activité Paranormale", value: "Moniteur d'Activité Paranormale" },
                        { name: "Ordinateur", value: "Ordinateur" },
                        { name: "Moniteur Sonore", value: "Moniteur Sonore" }
                    )
            )
    )
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("maudit")
            .setDescription("Renvoie les informations sur un objet maudit du jeu")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'objet maudit")
                    .setRequired(true)
                    .addChoices(
                        { name: "Planche Ouija", value: "Planche Ouija" },
                        { name: "Miroir Hanté", value: "Miroir Hanté" },
                        { name: "Poupée Vaudou", value: "Poupée Vaudou" },
                        { name: "Boîte à Musique", value: "Boîte à Musique" },
                        { name: "Cercle d'Invocation", value: "Cercle d’Invocation" },
                        { name: "Cartes de Tarot", value: "Cartes de Tarot" }
                    )
            )
    )
    ,
	async execute(interaction) {

        //bot's owner ID
        const ownerID = "398358008838488077";

        //get subcommand and value
        const chosenName = interaction.options.getString("name");
        const chosenCommand = interaction.options.getSubcommand();

        //important var
        var text;

        // /phasmo commands are only availible in the bot's owner server
        if(interaction.guildId != "993166505145540698"){
            return interaction.reply({
                embeds: [{
                    title: `Commande non-autorisée: Commande non disponible sur ce serveur.`,
                    description: `Si vous voulez utiliser cette commande, allez sur ce serveur:\nhttps://discord.gg/M9CvPvd42H`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }

        // /phasmo commands can only be used in the 'phasmophilie' category
        if(interaction.channel.parentId != "1028723510064984075"){
            return interaction.reply({
                embeds: [{
                    title: `Commande non-autorisée: Mauvaise catégorie`,
                    description: `L'exécution de cette requête nécessite d'être dans la catégorie dédiée au jeu Phasmophobia`,
                    color: consts.EMBEDCOLOR
                }],
                ephemeral: true
            });
        }

        //checks the subcommand and gets the Google doc file content as text
        if(chosenCommand == "entité"){
            text = await drive.files.export({
                fileId : "1uKZ2oojF1op7aY4Sl3CEjrSzlC2r-qHniRRXv664MK4",
                mimeType : "text/plain"
            });
            textToArray(text.data);
        } else if(chosenCommand == "equipement" || chosenCommand == "equipement-van"){
            text = await drive.files.export({
                fileId : "1QW4DrsGgbNNN_UK6rgaeTgquOnEoZ1-1cDS2FDMGOO4",
                mimeType : "text/plain"
            });
            textToArray(text.data);
        } else if(chosenCommand == "maudit"){
            text = await drive.files.export({
                fileId : "1Jcr3nlisRc3pdxZJ13Rb4_qZB4ThFJzgPI21m2cAqVk",
                mimeType : "text/plain"
            });
            textToArray(text.data);
        }

        //searches in the text data user asked for and converts it into an array
        function textToArray(text){
            //split on new line
            var data = text.split("\r\n");

            let stop = null;
            let entity = [];
            let details = null;
            let found = false;

            for(i = 0; i < data.length; i++){
                //searching in the summary the start and stop point
                if(data[i] == "* "+chosenName && data[i+1] != ''){
                    stop = data[i+1].substring(2);
                }

                //collects the data and converts it into a key/value array
                if(data[i] == chosenName || found == true){
                    if(data[i] == stop) break;
                    found = true;
                    if(data[i] == chosenName){
                        entity["entité"] = data[i];
                    }else if(data[i] != '' && data[i].slice(-1) == ":"){
                        entity[data[i].slice(0, -2)] = "";
                        details = data[i].slice(0, -2);
                    } else if(data[i] != ''){
                        entity[details] += data[i]+"\n";
                    }
                    if(data[i] == data.length-1) break;
                }
            }
            arrayToEmbed(entity);
        }

        //converts the requested array into a readable message
        function arrayToEmbed(arr){
            //building the embed
            var replyEmbed = new EmbedBuilder()
            .setColor(consts.EMBEDCOLOR)
            .setTitle(`${chosenName}`)
            .setAuthor({name: `Par: ${interaction.user.username}`})
            .setTimestamp()
            .setFooter({text: consts.EMBEDFOOTER});

            
            //adding the array data
            let keys = Object.keys(arr);
            for(i = 1; i < keys.length; i++){
                replyEmbed.addFields({
                    name: `${keys[i]}`, value: `${arr[keys[i]]}`
                });
            }

            //send the message
            return interaction.reply({embeds: [replyEmbed]});
        }
	}
};