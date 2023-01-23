const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("phasmo")
    .setDescription("Renvoie des informations sur le jeu")
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("ghost")
            .setDescription("Renvoie les informations sur une entité du jeu")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'entité")
                    .setRequired(true)
                    .addChoices(
                        { name: "Esprit", value: "spirit" },
                        { name: "Spectre", value: "wraith" },
                        { name: "Fantôme", value: "phantom" },
                        { name: "Poltergeist", value: "poltergeist" },
                        { name: "Banshee", value: "banshee" },
                        { name: "Djinn", value: "jinn" },
                        { name: "Cauchemar", value: "mare" },
                        { name: "Revenant", value: "revenant" },
                        { name: "Ombre", value: "shade" },
                        { name: "Démon", value: "demon" },
                        { name: "Yurei", value: "yurei" },
                        { name: "Oni", value: "oni" },
                        { name: "Yokai", value: "yokai" },
                        { name: "Hantu", value: "hantu" },
                        { name: "Goryo", value: "goryo" },
                        { name: "Myling", value: "myling" },
                        { name: "Onryo", value: "onryo" },
                        { name: "Les Jumeaux", value: "twins" },
                        { name: "Raiju", value: "raiju" },
                        { name: "Obake", value: "obake" },
                        { name: "Le Mimic", value: "mimic" },
                        { name: "Moroï", value: "moroi" },
                        { name: "Deogen", value: "deogen" },
                        { name: "Thayé", value: "thaye" },
                        { name: "ALL", value: "all" }
                    )
            )
    )
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("equipment")
            .setDescription("Renvoie les informations sur un équipement du jeu")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'équipement")
                    .setRequired(true)
                    .addChoices(
                        { name: "Candle", value: "candle" },
                        { name: "Crucifix", value: "crucifix" },
                        { name: "D.O.T.S Projector", value: "D.O.T.S projector" },
                        { name: "EMF Reader", value: "EMF reader" },
                        { name: "Flashlight", value: "flashlight" },
                        { name: "Ghost Writing Book", value: "ghost writing book" },
                        { name: "Glowstick", value: "glowstick" },
                        { name: "Head Mounted Camera", value: "head mounted camera" },
                        { name: "Lighter", value: "lighter" },
                        { name: "Motion Sensor", value: "motion sensor" },
                        { name: "Parabolic Microphone", value: "parabolic microphone" },
                        { name: "Photo Camera", value: "photo camera" },
                        { name: "Salt Shaker", value: "salt shaker" },
                        { name: "Sanity Pills", value: "sanity pills" },
                        { name: "Smudge Sticks", value: "smudge sticks" },
                        { name: "Sound Sensor", value: "sound sensor" },
                        { name: "Spirit Box", value: "spirit box" },
                        { name: "Strong Flashlight", value: "strong flashlight" },
                        { name: "Thermometer", value: "thermometer" },
                        { name: "Tripod", value: "tripod" },
                        { name: "UV Flashlight", value: "UV flashlight" },
                        { name: "Video Camera", value: "video camera" }
                    )
            )
    )
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("equipmentvan")
            .setDescription("Renvoie les informations sur un équipement provenant du van du jeu")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'équipement provenant du van")
                    .setRequired(true)
                    .addChoices(
                        { name: "Tableau d'objectifs", value: "objective board" },
                        { name: "Carte des lieux", value: "site map" },
                        { name: "Moniteur de Santé Mentale", value: "sanity monitor" },
                        { name: "Moniteur d'Activité Paranormale", value: "site activity monitor" },
                        { name: "Ordinateur", value: "computer" },
                        { name: "Moniteur Sonore", value: "sound monitor" }
                    )
            )
    )
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("cursed")
            .setDescription("Renvoie les informations sur un objet maudit du jeu")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Nom de l'objet maudit")
                    .setRequired(true)
                    .addChoices(
                        { name: "Planche Ouija", value: "ouija board" },
                        { name: "Mirroir Hanté", value: "haunted mirror" },
                        { name: "Poupée Vaudou", value: "voodoo doll" },
                        { name: "Boîte à Musique", value: "music box" },
                        { name: "Cercle d'Invocation", value: "summoning circle" },
                        { name: "Cartes de Tarot", value: "tarot cards" }
                    )
            )
    )
    .addSubcommand( (subcommand) =>
        subcommand
            .setName("astuces")
            .setDescription("Donne des astuces pour réussir certains évènements ou des défis en tous genres")
            .addStringOption( (option) =>
                option
                    .setName("name")
                    .setDescription("Astuce recherchée")
                    .setRequired(true)
                    .addChoices(
                        { name: "Trophée Bronze", value: "bronze-trophy" },
                        { name: "Argent Facile", value: "easy-money" }
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

        // /phasmo commands are only availible in the bot's owner server
        if(interaction.guildId != "993166505145540698"){
            return interaction.reply({
                embeds: [{
                    title: `Commande non-autorisée: Commande non disponible sur ce serveur.`,
                    description: `Si vous voulez utiliser cette commande, allez sur ce serveur:\nhttps://discord.gg/M9CvPvd42H`,
                    color: 0xFF0000
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
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        //Only an administrator can use the "ALL" parameter
        if(chosenName == "all" && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            return interaction.reply({
                embeds: [{
                    title: `Commande non-autorisée: Permissions manquantes`,
                    description: `L'affichage de toutes les entités une a une n'est pas autorisé.`,
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        }

        //start building the embed
        var replyEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setAuthor({name: `Requested by ${interaction.user.username}`})
        .setTimestamp()
        .setFooter({text: "hellBot by @Evileo#6462"});
        
        //get the data depending on request
        if(chosenCommand == "ghost"){

            const ghosts = ["spirit", "wraith", "phantom", "poltergeist", "banshee", "jinn", "mare", "revenant", "shade", "demon", "yurei", "oni", "yokai", "hantu", "goryo", "myling", "onryo", "twins", "raiju", "obake", "mimic", "moroi", "deogen", "thaye"];

            let evidences = "";
            let abilities = "";
            let strengths = "";
            let weaknesses = "";
            let description = "";
            let attack = "";
            let tips = "";
            let name = "";

            let loop = 1;
            let loops = false;
            if(chosenName == "all"){
                loop = ghosts.length;
                loops = true;
            }

            for(i = 0; i < loop; i++){
                let ghostToDisplay = chosenName;
                if(loops == true){
                    ghostToDisplay = ghosts[i];
                }

                switch(ghostToDisplay){
                    case "spirit":
                        name = "Esprit";
                        evidences = "-Ecriture Fantomatique\n-EMF 5\n-Spirit Box";
                        abilities = "aucune";
                        strengths = "-Il n'est pas possible de les identifier en chasse ou par une capacité, ce qu'il fait qu'ils sont plus difficiles à identifier";
                        weaknesses = "-Utiliser un bâton d'encens empêchera l'esprit de chasser pendant **3 minutes**";
                        description = "Les Esprits sont des entités très banales. Ils sont puissants mais passifs et attaquent seulement lorsqu’ils y sont obligés. Ils défendent le lieu de leur décès coûte que coûte, tuant quiconque abuserait de leur hospitalité.";
                        attack = "50%";
                        tips = "-Mettre un chronomètre lorsque l'esprit a pris l'encens, s'il chasse avant 3 minutes, ce n'en est pas un";
                        break;
                    case "wraith":
                        name = "Spectre";
                        evidences = "-Projecteur D.O.T.S\n-EMF 5\n-Spirit Box";
                        abilities = "-Peut se **téléporter** à un joueur aléatoire";
                        strengths = "-Après avoir utilisé sa capacité, il peut lancer une **chasse**";
                        weaknesses = "le **SEL**\n-Lorsqu'il marche dans du sel, il ne laisse pas d'empreinte de pas\n-Lorsqu'il marche dans du sel, son activité augmente\n-Lorsqu'il utilise sa capacité, un EMF 2 sera provoqué sans qu'aucune interaction ait eu lieu";
                        description = "Les Spectres font partie des entités les plus dangereuses que vous pouvez rencontrer. Il s’agit de la seule entité connue pour savoir voler et traverser les murs.";
                        attack = "50%";
                        tips = "-Prendre en photo une empreinte dans le sel, s'il n'y a pas écrit 'empreinte de pas' dans la description de la photo, il s'agit d'un spectre";
                        break;
                    case "phantom":
                        name = "Fantôme";
                        evidences = "-Projecteur D.O.T.S\n-Empreintes Digitales\n-Spirit Box";
                        abilities = "-Peut se **déplacer** vers un joueur aléatoire";
                        strengths = "-Draine plus de santé mentale durant les apparitions\n-Peut lancer une chasse après avoir utilisé sa capacité";
                        weaknesses = "-Lors d'une apparition, le prendre en **photo** le fera disparaître, mais l'apparition continuera. De plus, la photo ne sera pas brouillée\n-Durant une chasse, le fantôme sera clignotera moins souvent, il sera invisible sur de plus longues périodes";
                        description = "Un Fantôme peut posséder les vivants, le plus souvent invoqué par une planche Ouija. Il induit également la peur chez ceux qui l’entourent.";
                        attack = "50%";
                        tips = "-Attendre un évènement et prendre une photo\n-Utiliser le cercle d'invocation pour observer sa fréquence de clignotement";
                        break;
                    case "poltergeist":
                        name = "Poltergeist";                
                        description = "L’une des entités les plus célèbres, il est connu pour manipuler les objets autour de ses victimes afin de les effrayer.";
                        evidences = "-Ecriture Fantomatique\n-Empreintes Digitales\n-Spirit Box";
                        abilities = "-Peut lancer plusieurs objets en même temps";
                        strengths = "-Sa capacité et les lancers puissants drainent plus de santé mentale";
                        weaknesses = "-Lors d'une chasse, le poltergeist lancera beaucoup plus d'objets que tout autre entité\n-Peut lancer les objets avec plus de puissance";
                        attack = "50%";
                        tips = "-Faire un tas d'objets dans la pièce de l'entité, s'il explose d'un coup, il s'agit d'un poltergeist";
                        break;
                    case "banshee":
                        name = "Banshee";                
                        description = "La sirène chantante, connue pour attirer ses victimes avec ses chansons. On dit qu’elle identifie précisément sa proie avant de porter le coup fatal";
                        evidences = "-Orbes Fantomatiques\n-Empreintes Digitales\n-Projecteur D.O.T.S";
                        abilities = "-Ne cible qu'un seul joueur lors des chasses. (Ne fonctionne que lorsque le joueur ciblé est dans le bâtiment lors de la chasse)";
                        strengths = "-Les apparitions chantantes drainent plus de santé mentale";
                        weaknesses = "-Peut chanter dans le microphone parabolique (Exemple: https://clips.twitch.tv/FaintRealCheddarKippa-gUrKVYEqhSmoTN-r merci à Ylarhia pour le clip)\n-Fera bien plus d'apparitions chantantes que toute autre entité\n-Sa capacité\n-Ne prend en compte que la santé mentale de la cible pour chasser";
                        attack = "50%";
                        tips = "-Essayez d'abuser des objets maudits et des pilules pour savoir qui est le joueur ciblé";
                        break;
                    case "jinn":
                        name = "Djinn";
                        description = "Le Djinn est un fantôme territorial qui attaque lorsqu’il est menacé. Il est également connu pour pouvoir se déplacer à une vitesse significative.";
                        evidences = "-EMF 5\n-Empreintes Digitales\n-Températures Glaciales";
                        abilities = "-Si le disjoncteur est activé, il sera plus rapide lors de ses chasses s'il repère un joueur loin de lui\n-Si le disjoncteur est activé, peut réduire fortement la santé mentale des joueurs à proximité (25%)";
                        strengths = "-Sa capacité le rend redoutable\n-Difficile de lui échapper en chasse si le disjoncteur est allumé";
                        weaknesses = "-Ne peut pas éteindre le disjoncteur";
                        attack = "50%";
                        tips = "-Mettre un lecteur EMF au niveau du disjoncteur, si l'entité active l'EMF mais n'éteint pas le disjoncteur, il s'agit d'un djinn.";
                        break;
                    case "mare":
                        name = "Cauchemar";
                        description = "Le Cauchemar est la source de tous les mauvais rêves, ce qui le rend plus puissant dans l’obscurité.";
                        evidences = "-Spirit Box\n-Orbes Fantomatiques\n-Ecriture Fantomatique";
                        abilities = "aucune";
                        strengths = "-Peut se déplacer dans une pièce sombre si jamais la lumière de sa pièce favorite est allumée";
                        weaknesses = "-Ne peut pas allumer de lumières\n-Peut éteindre les lumières et le disjoncteur juste après qu'ils aient été allumés\n-Les apparitions qui font éclater les lumières sont plus courantes";
                        attack = "60% si la pièce est plongée dans le noir\n40% si la pièce est éclairée";
                        tips = "-Se mettre un peu en dessous de 50% de santé mentale (mais au dessus de 40%), allumer la lumière de la pièce de l'entité et l'énerver. S'il ne chasse pas, c'est un cauchemar";
                        break;
                    case "revenant":
                        name = "Revenant";
                        description = "Le Revenant est une entité violente qui attaquera sans distinction. Leur vitesse de déplacement peut être trompeuse puisqu’ils sont lents au repos mais incroyablement rapides lorsqu’ils chassent.";
                        evidences = "-Températures Glaciales\n-Orbes Fantomatiques\n-Ecriture Fantomatique";
                        abilities = "aucune";
                        strengths = "-Une des entités les plus rapides du jeu lorsqu'elle voit quelqu'un";
                        weaknesses = "-Une des entités les plus lente du jeu lorsqu'elle ne voit personne";
                        attack = "50%";
                        tips = "Se mettre dans un angle, attendre que l'entité vous voit, si elle se met à courir, cassez son champ de vision, si il ralentit, c'est un revenant";
                        break;
                    case "shade":
                        name = "Ombre";
                        description = "L’Ombre est une entité timide. Il semble qu’une Ombre cessera toute activité si plusieurs personnes sont à proximité.";
                        evidences = "-Températures Glaciales\n-EMF 5\n-Ecriture Fantomatique";
                        abilities = "aucune";
                        strengths = "-Extrêmement difficile à trouver";
                        weaknesses = "-Ne fait presque pas ou aucune apparition physique\znApparaît sous forme d'ombre lors de l'utilisation du cercle d'Invocation et de la Boîte à Musique";
                        attack = "35%";
                        tips = "Lorsque la santé moyenne passe sous les 35%, 2 joueurs ou plus se mettent dans la pièce de l'entité pendant quelques temps, ensuite, ils sortent. Si l'entité se met à chasser après leur sortie, c'est une ombre.\n-*A vérifier*: Mettre le doudou lapin ou un ballon dans la pièce de l'entité, s'il s'agit d'une ombre, elle devrait jouer avec";
                        break;
                    case "demon":
                        name = "Démon";
                        description = "Le Démon est l’une des pires entités que vous puissiez rencontrer puisqu’on sait qu’ils attaquent sans raison apparente.";
                        evidences = "-Températures Glaciales\n-Empreintes Digitales\n-Ecriture Fantomatique";
                        abilities = "-Peut se rapprocher d'un joueur et initier une chasse, peut importe la santé mentale";
                        strengths = "-Peut chasser très tôt\n-Fréquence de chasse élevée (20 secondes entre 2 chasses au lieu de 25)";
                        weaknesses = "-L'encens ne fonctionne qu'une minute sur le démon\n-Les objets maudits consomment moins de santé mentale\n-La portée des crucifix est augmentée à 5 mètres";
                        attack = "70% fréquence de chasse normale\n50% fréquence de chasse élevée";
                        tips = "Lorsque une chasse maudite est lancée, le démon pourra lancer immédiatement une chasse après que l'autre se soit terminée";
                        break;
                    case "yurei":
                        name = "Yurei";
                        description = "Le Yurei est une entité qui est revenue dans le monde physique dans une optique de vengeance ou par pure haine.";
                        evidences = "-Températures Glaciales\n-Orbes Fantomatiques\n-Projecteur D.O.T.S";
                        abilities = "-Peut fermer intégralement une porte avec un grand SLAM! (fonctionne avec la porte d'entrée)";
                        strengths = "-Se déplace énormément\n-Change de pièce plus souvent que les autres entités";
                        weaknesses = "-L'encens le bloque dans sa pièce";
                        attack = "50%";
                        tips = "Laisser les portes autour de la pièce de l'entité ouverte";
                        break;
                    case "oni":
                        name = "Oni";
                        description = "L’Oni adore effrayer le plus possible ses victimes avant d’attaquer. Ils sont souvent observés sous leur forme physique en train de garder le lieu de leur décès.";
                        evidences = "-Températures Glaciales\n-EMF 5\n-Projecteur D.O.T.S";
                        abilities = "aucune";
                        strengths = "-Les apparitions auront tendance à drainer plus de santé mentale";
                        weaknesses = "-Il ne fait que des apparitions physiques en forme complète\n-Il est beaucoup plus actif lorsque 2 personnes ou plus se trouvent à proximité\n-En chasse, il disparaît moins souvent que les autres entités";
                        attack = "50%";
                        tips = "-Observer les apparitions, si une apparition n'est pas en forme complète, ce n'est pas un oni.";
                        break;
                    case "yokai":
                        name = "Yokai";
                        description = "Les Yokai sont des entités banales attirées par les voix humaines. Ils hantent très souvent les maisons familiales.";
                        evidences = "-Spirit Box\n-Orbes Fantomatiques\n-Projecteur D.O.T.S";
                        abilities = "aucune";
                        strengths = "-Peut lancer des chasses si l'on parle a côté de lui";
                        weaknesses = "-En chasse, le yokai ne vous entendra que s'il est à 2 mètres de vous";
                        attack = "50%\n80% si un joueur parle a proximité";
                        tips = "-En chasse, se mettre a quelques mettres (plus de 2) d'un point de passage (hors vue) de l'entité, avec une lampe torche allumée, si l'entité ne dévie pas vers vous, c'est un yokai";
                        break;
                    case "hantu":
                        name = "Hantu";
                        description = "Les Hantu sont des entités rares qui profitent des climats les plus froids, qui semble les rendre plus agressifs et puissants.";
                        evidences = "-Empreintes Digitales\n-Orbes Fantomatiques\n-Températures Glaciales *Obligatoire en cauchemar*";
                        abilities = "aucune";
                        strengths = "-Plus il fait froid, plus il est rapide\n-A tendance à lancer des chasses en apparaissant hors de sa pièce";
                        weaknesses = "-N'allume jamais le disjoncteur\n-Ralentit lorsqu'il fait chaud\n-Lorsqu'il chasse dans sa pièce, il soufflera du froid";
                        attack = "50%";
                        tips = "-En chasse, écouter la vitesse de déplacement de l'entité, si elle varie entre les pièces (surtout entre sa pièce favorite et les autres), c'est un hantu";
                        break;
                    case "goryo":
                        name = "Goryo";
                        description = "Il vous faudra regarder à travers une caméra pour voir un Goryo passer dans le champ d’un projecteur D.O.T.S.";
                        evidences = "-Empreintes Digitales\n-EMF 5\n-Projecteur D.O.T.S *Obligatoire en cauchemar*";
                        abilities = "aucune";
                        strengths = "-Ne peut pas être vu à l'oeil nu au Projecteur D.O.T.S\n-Ne se montrera pas au Projecteur D.O.T.S si quelqu'un se situe dans sa pièce";
                        weaknesses = "-Ne change pas beaucoup de pièce favorite";
                        attack = "50%";
                        tips = "-Placer des capteurs de mouvements a côté de sa pièce et dedans, si ceux dans sa pièce sont bien plus activés que ceux à l'extérieur, c'est probablement un goryo";
                        break;
                    case "myling":
                        name = "Myling";
                        description = "Le Myling est une entité très active et bavarde. La rumeur prétend cependant qu’il devient silencieux quand il chasse.";
                        evidences = "-Empreintes Digitales\n-EMF 5\n-Ecriture Fantomatique";
                        abilities = "aucune";
                        strengths = "-En chasse, il sera plus difficile de déterminer la position de l'entité";
                        weaknesses = "-Fait plus de bruit dans le microphone parabolique\n-Ses bruits de pas sont plus étouffés en chasse";
                        attack = "50%";
                        tips = "-Placer une lampe UV dans une cachette, lors d'une chasse, si elle se met a clignoter avant que vous entendez les pas, c'est un myling (ou un raiju)";
                        break;
                    case "onryo":
                        name = "Onryo";
                        description = "L’Onryo est souvent décrit comme un 'esprit furieux'. En quête de vengeance, il vole les âmes des corps de victimes mourantes. Cette entité est connue pour avoir peur de quelconque forme de feu, et fera tout pour s’en tenir éloignée.";
                        evidences = "-Spirit Box\n-Orbes Fantomatiques\n-Températures Glaciales";
                        abilities = "-Peut attaquer peu importe la santé mentale si 3 bougies s'éteignent rapidement a côté de lui";
                        strengths = "aucune";
                        weaknesses = "-Les bougies allumées ont un effet de crucifix et sont prioritaires\n-Aura plus tendance à éteindre les bougies";
                        attack = "60%";
                        tips = "-Placer un crucifix sous une bougie, si le crucifix se fait manger avec que la bougie soit éteinte, ce n'est pas un onryo";
                        break;
                    case "twins":
                        name = "Les jumeaux";
                        description = "Ces entités ont été observées en train d’imiter les actions l’une de l’autre. Elles alternent leurs attaques pour déstabiliser leur proie.";
                        evidences = "-Spirit Box\n-EMF 5\n-Températures Glaciales";
                        abilities = "-Il y a une deuxième entité qui ne peut que laisser des traces EMF et chasser";
                        strengths = "-Le jumeau secondaire est quasiment indétectable";
                        weaknesses = "-Il y aura très souvent des doubles interactions, parfois à 2 endroits différents\n-Le jumeau secondaire peut faire une interaction loin de la pièce favorite, pouvant induire en erreur sur celle-ci";
                        attack = "50%";
                        tips = "-En chasse, écouter la vitesse de déplacement de l'entité, le jumeau secondaire est plus rapide que l'autre. Si entre plusieurs chasses la vitesse semble s'alterner, il s'agit peut-être des jumeaux";
                        break;
                    case "raiju":
                        name = "Raiju";
                        description = "Le Raiju est un démon qui profite des courants électriques. Bien que généralement calme, il peut devenir agité quand il est submergé de puissance.";
                        evidences = "-Orbes Fantomatiques\n-EMF 5\n-Projecteur D.O.T.S";
                        abilities = "aucune";
                        strengths = "-impossible a semer s'il est a proximité d'appareils électroniques allumés\n-Lance des chasses plus tôt si un appareil électronique se situe à proximité";
                        weaknesses = "-En chasse, il est facile à identifier";
                        attack = "50%\n65% si un appareil électronique en marche est a proximité";
                        tips = "-Placer des appareils électroniques sur son trajet, lorsqu'il lancera une chasse, si vous l'entendez accélerer au niveau des appareils, c'est un raiju\n-Placer une lampe UV dans une cachette, si en chasse il la fait dysfonctionner avant que vous l'entendiez il s'agit peut-être d'un raiju (il peut aussi s'agit d'un myling)";
                        break;
                    case "obake":
                        name = "Obake";
                        description = "Les Obake sont de terrifiants métamorphes capables de prendre de nombreuses formes. On les a vus prendre des formes humanoïdes pour attirer leurs proies.";
                        evidences = "-Orbes Fantomatiques\n-EMF 5\n-Empreintes Digitales *Obligatoire en cauchemar*";
                        abilities = "-Peut camoufler ses interactions (elles ne laisseront aucune preuve)\n-Peut réduire la durée pendant laquelle les preuves sont disponibles";
                        strengths = "-impossible a semer s'il est a proximité d'appareils électroniques allumés\n-Lance des chasses plus tôt si un appareil électronique se situe à proximité";
                        weaknesses = "-Peut laisser des empreintes à 6 doigts sur les portes, 2 doigts sur les interrupteurs et 5 doigts sur les claviers";
                        attack = "50%";
                        tips = "-A la fin d'une chasse, se diriger vers les portes que l'entité a touché avec une lampe UV, et compter les doigts\n-Compter le temps que les empreintes mettent à disparaitre";
                        break;
                    case "mimic":
                        name = "Le mimic";
                        description = "Le Mimic est une entité insaisissable et mystérieuse qui imite les traits et comportements des autres, y compris d’autres entités.";
                        evidences = "-Spirit Box\n-Empreintes Digitales\n-Températures Glaciales";
                        abilities = "-Copie les autres fantomes (un à la fois, et peut changer toutes les minutes)";
                        strengths = "-Crée énormément de confusion";
                        weaknesses = "-**Fournit une preuve supplémentaire** ne comptant pas dans le journal : Les orbes fantomatiques";
                        attack = "50%\nOu le %age de l'entité copiée";
                        tips = "-Compter les preuves\n-Observer les changements de comportement";
                        break;
                    case "moroi":
                        name = "Moroï";
                        description = "Le Moroï a émergé d’outre-monde afin de siphonner l’énergie des vivants. Ils maudissent leurs victimes et celles-ci ne peuvent guérir qu’avec des antidotes ou en déménageant très loin.";
                        evidences = "-Spirit Box **Obligatoire en cauchemar**\n-Ecriture Fantomatique\n-Températures Glaciales";
                        abilities = "-Maudit les personnes a qui il répond à la Spirit Box ou qui l'entendent au microphone parabolique, leur faisant perdre leur santé mentale bien plus vite (s'arrête à la prise d'une pilule et se met en pause lorsque le joueur sort du bâtiment)";
                        strengths = "-Plus la santé mentale est basse, plus il va vite";
                        weaknesses = "-Est désorienté plus longtemps lorsqu'il prend un encens lors d'une chasse";
                        attack = "50%";
                        tips = "-Lorsqu'une personne obtient une réponse de l'entité, attendre 20 secondes dans la maison. Si un des joueurs a une santé bien plus basse sans raison, c'est un moroï";
                        break;
                    case "deogen":
                        name = "Deogen";
                        description = "Parfois entourés d’un brouillard sans fin, les Deogen ont échappés aux chasseurs de fantômes pendant des années. Ces entités arrivent à trouver les proies les plus insaisissables avant de les traquer jusqu’à l’épuisement.";
                        evidences = "-Spirit Box *Obligatoire en cauchemar*\n-Ecriture Fantomatique\n-Projecteur D.O.T.S";
                        abilities = "-Connait la position de tous les joueurs dans le batiment, impossible de se cacher";
                        strengths = "-Arrive très rapidement sur un joueur éloigné";
                        weaknesses = "-Entité la plus lente du jeu lorsqu'elle se situe à côté d'un joueur\n-Peut produire un bruit d'essoufflement à la Spirit Box";
                        attack = "40%";
                        tips = "-Se mettre dans une pièce dans laquelle on peut faire tourner le fantôme, lorsqu'une chasse commence, rester dans la pièce avec un encens, si l'entité arrive très vite vers vous puis ralentit soudainement une fois proche de vous, c'est un deogen\n-Préparez à l'avance un tas d'objets à l'endroit ou vous souhaitez le faire tourner, puis, jetez lui les objets lorsqu'il chasse, c'est marrant";
                        break;
                    case "thaye":
                        name = "Thayé";
                        description = "Le Thayé est connu pour vieillir rapidement, même dans l’au-delà. D’après ce que nous savons, ils semblent se détériorer plus rapidement en présence des vivants.";
                        evidences = "-Orbes Fantomatiques\n-Ecriture Fantomatique\n-Projecteur D.O.T.S";
                        abilities = "-Vieillit chaque minute dès qu'un joueur est a proximité (maximum de 10)";
                        strengths = "-Extrêmement rapide et actif en début de partie";
                        weaknesses = "-Très lent et inactif lorsqu'il est vieux\n-Change sa réponse à 'Quel âge avez-vous' à la Spirit Box en fonction de son niveau de vieillissement\n-Change sa réponse également pour la Ouija";
                        attack = "75% en début de partie\n-Perd 6% par tranche d'âge gagnée\n-15% de fin de partie";
                        tips = "-Dès que vous avez trouvé sa pièce, jouez à la bougie, son seuil de santé mentale pour attaquer descendra plus vite que votre santé mentale";
                        break;
                    default: //If an error occurs, mention the bot owner
                        return interaction.reply(`<@${ownerID}>, new Error !\nRequest: \`/phasmo ghost ${ghostToDisplay}\``);
                }

                //finish embed build
                const replyEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setAuthor({name: `Requested by ${interaction.user.username}`})
                .setTimestamp()
                .setFooter({text: "hellBot by @Evileo#6462"})
                .setTitle(name)
                .setDescription(description)
                .addFields(
                    { name: "Preuves apportées", value: `${evidences}` },
                    { name: "Seuil de santé mentale minimum pour attaquer", value: `${attack}` },
                    { name: "Forces", value: `${strengths}` },
                    { name: "Faiblesses", value: `${weaknesses}` },
                    { name: "Pouvoirs et capacités", value: `${abilities}` },
                    { name: "Astuces", value: `${tips}` }
                );

                interaction.channel.send({embeds: [replyEmbed]});
            }

            


        } else if(chosenCommand == "equipment" || chosenCommand == "equipmentvan"){

            const equipment = ["spirit box", "ghost writing book", "EMF reader", "UV flashlight", "flashlight", "video camera", "photo camera", "D.O.T.S projector", "candle", "crucifix", "glowstick", "head mounted camera", "lighter", "motion sensor", "parabolic microphone", "salt shaker", "sanity pills", "smudge sticks", "sound sensor", "strong flashlight", "thermometer", "tripod", "objective board", "site map", "sanity monitor", "site activity monitor", "computer", "sound monitor"];

            let name = "";
            let price = "";
            let description = "";
            let manual = "";
            let affectedGhosts = "";
            let picture = "";
            let tip = "";
            let max = "";
            let byDefault = "";

            let loop = 1;
            let loops = false;
            if(chosenName === "all"){
                loop = equipment.length;
                loops = true;
            }

            for(i = 0; i < loop; i++){
                let equipmentToDisplay = chosenName;
                if(loops == true){
                    equipmentToDisplay = equipment[i];
                }

                switch(chosenName){
                    case "spirit box":
                        name = "Spirit Box";
                        price = "50$";
                        byDefault = "oui";
                        max = "2";
                        description = "La Spirit Box est une radio qui permet au fantôme de communiquer directement avec le joueur qui l’utilise dans sa pièce. Elle peut constituer une preuve dans votre journal.";
                        manual = "allumer la Spirit Box, se placer dans la pièce de l'entité et éteindre les lumières, poser des questions\nSi la croix s'active, c'est que la question a été comprise par le jeu et/ou que l'entité la entendue\nLa réponse de l'entité sera indiquée grâce au voyant 'fantôme', qui s'activera, de plus l'entité répondra par quelques mots";
                        affectedGhosts = "Esprit / Spectre / Fantôme / Poltergeist / Cauchemar / Yokai / Onryo / Les Jumeaux / Le Mimic / Moroï / Deogen";
                        tip = "Certaines entités ne répondront que lorsque la personne est seule, préférez toujours utilisez la Spirit Box lorsque vous êtes seul\n Certaines entités ne répondent qu'à une seule personne, veillez bien à ce que tout le monde ait tenté la Spirit Box";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/3/30/SpiritBox.png/revision/latest?cb=20220824071742&path-prefix=fr";
                        break;
                    case "ghost writing book":
                        name = "Livre d'Ecriture Fantomatique";
                        price = "40$";
                        byDefault = "oui";
                        max = "2";
                        description = "Le livre d’écriture fantomatique est un livre ouvert qui permet au fantôme de laisser un message ou des dessins qu’il écrira directement sur les pages blanches. Il faut toutefois le placer dans la pièce d’affectation du fantôme pour qu’il puisse fonctionner. Il peut constituer une preuve dans votre journal.";
                        manual = "Placer le livre dans la pièce de l'entité dans le noir. Si l'entité a 'Ecriture fantomatique' pour preuve";
                        affectedGhosts = "Esprit / Poltergeist / Cauchemar / Revenant / Ombre / Démon / Mylin / Moroï / Deogen / Thayé";
                        tip = "-Lorsque l'entité écrit sur le livre, le lecteur EMF s'active, essayez de voir si un EMF 5 se déclenche\n-Si jamais l'entité jette le livre et qu'elle l'a dans ses preuves, elle écrira forcément dedans\n-Placer le livre proche d'une caméra, il est possible de voir l'entité écrire au travers d'elle";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/2/2c/ClosedBook_Render.png/revision/latest?cb=20210929050027";
                        break;
                    case "EMF reader":
                        name = "Lecteur EMF";
                        price = "45$";
                        byDefault = "oui";
                        max = "2";
                        description = "L’EMF est un petit détecteur de champ électromagnétique qui réagit à la présence du fantôme et aux interactions dans une pièce. Il peut constituer une preuve dans votre journal s’il est au niveau 5  (5 diodes allumées, du vert au rouge).";
                        manual = "Lorsqu'une interaction a lieu, placer le lecteur EMF devant l'objet ayant subi l'interaction, si vous être au bon endroit, il devrait biper et des diodes vont s'allumer";
                        affectedGhosts = "Esprit / Spectre / Djinn / Ombre / Oni / Goryo / Myling / Les Jumeaux / Raiju / Obake";
                        tip = "-Placer le lecteur EMF a des endroits stratégiques en fonction des entités que vous soupçonnez (sur le disjoncteur pour le djinn par exemple)";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/1/16/LecteurEMF.png/revision/latest?cb=20220824065200&path-prefix=fr";
                        break;
                    case "UV flashlight":
                        name = "Lampe UV";
                        price = "35$";
                        byDefault = "oui";
                        max = "2";
                        description = "La lampe UV peut révéler les empreintes digitales laissées par le fantôme avec sa lumière ultra-violette. Il est donc utile de regarder à des endroits comme les portes, les interrupteurs ou les fenêtres. Elle peut constituer une preuve dans votre journal.";
                        manual = "Allumer la lampe UV et pointer le faisceau su une porte / fenêtre / interrupteur ayant été touché par l'entité. Si l'entité possède 'Empreintes digitales dans ses preuves' une empreinte devrait apparaître en vert";
                        affectedGhosts = "Fantôme / Poltergeist / Banshee / Djinn / Démon / Hantu / Goryo / Myling / Obake / Le Mimic";
                        tip = "Fonctionne aussi avec les empreintes de pas (lorsque l'entité a marché dans le sel), placer la lampe dans la même direction que les empreintes de l'entité afin de toutes les voir. Chaque empreinte de pas peut être prise en photo";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/0/0b/UVLight_Render.png/revision/latest?cb=20210929051451";
                        break;
                    case "flashlight":
                        name = "Lampe de Poche";
                        price = "30$";
                        byDefault = "oui";
                        max = "4";
                        description = "La lampe de poche est l’outil de base pour éclairer les endroits sombres.";
                        manual = "Activer la lampe de poche pour voir dans le noir";
                        affectedGhosts = "-";
                        tip = "-";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/1/19/Flashlight_Render.png/revision/latest?cb=20210929051444";
                        break;
                    case "video camera":
                        name = "Caméra Vidéo";
                        price = "50$";
                        byDefault = "oui";
                        max = "6";
                        description = "La caméra vidéo permet d’observer les orbes fantomatiques dans une pièce, depuis l’ordinateur du camion. Ces dernières peuvent constituer une preuve dans votre journal. Cependant, pour les observer, il faut basculer la caméra en vision nocturne à l’aide du clavier. Si plusieurs caméras sont mises en place, il est possible de changer de point de vue avec la souris sur le bureau.";
                        manual = "Placer la caméra a des points stratégiques de la maison histoire de pouvoir détecter les actions du fantôme";
                        affectedGhosts = "Banshee / Cauchemar / Revenant / Yurei / Yokai / Hantu / Onryo / Raiju / Obake / Thayé / Le Mimic (ne compte pas comme une preuve mais en est une)";
                        tip = "-Pour rapidement détecter la pièce du fantôme (si jamais l'entité a pour preuve 'Orbe Fantomatique'), se balader dans toutes les pièces avec la caméra vidéo en mode nocturne, et voir s'il y a un orbe, cela fera d'une pierre 2 coups, la pièce + une preuve";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/4/40/Cam%C3%A9raVid%C3%A9o.png/revision/latest?cb=20220824074628&path-prefix=fr";
                        break;
                    case "photo camera":
                        name = "Appareil Photo";
                        price = "40$";
                        byDefault = "oui";
                        max = "3";
                        description = "L’appareil photo est un outil permettant de prendre diverses interactions en photo qui seront ensuite affichées dans votre journal et peut accomplir certains objectifs. De plus, les photos prises peuvent rapporter de l’argent ($) selon la proximité avec l’interaction ou le fantôme.";
                        manual = "Lorsqu'une interaction, une apparition ou une chasse survient, prendre un photo va rapporter de l'argent, la photo marche également sur les empreintes digitales";
                        affectedGhosts = "Tous";
                        tip = "Les photos de crucifix, fantôme, empreintes rapportent le plus";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/0/03/Camera_v0.3.0.png/revision/latest?cb=20210918071718";
                        break;
                    case "D.O.T.S projector":
                        name = "Projecteur D.O.T.S";
                        price = "65$";
                        byDefault = "oui";
                        max = "2";
                        description = "Le projecteur D.O.T.S projette des petits points verts sur une zone délimitée. Il permet notamment de révéler la présence du fantôme si ce dernier passe dans la zone projetée par le détecteur. Cet équipement peut constituer une preuve dans le journal.";
                        manual = "Placer le projecteur D.O.T.S dans la pièce de l'entité ou un endroit dans lequel elle passe souvent. Lorsque l'entité passera dans son rayon, une silhouette de celle-ci se dessinera";
                        affectedGhosts = "Spectre / Fantôme / Banshee / Yurei / Oni / Yokai / Goryo / Raiju / Deogen / Thayé";
                        tip = "Peut servir à éclairer un endroit tout en faisant baisser votre santé mentale";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/2/25/Dots-proj.png/revision/latest?cb=20210827031031";
                        break;
                    case "candle":
                        name = "Bougie";
                        price = "15$";
                        byDefault = "non";
                        max = "4";
                        description = "La bougie, une fois allumée avec le briquet, permet d’éclairer une zone autour du joueur. Cela lui permettra notamment de conserver sa santé mentale.";
                        manual = "Doit être allumée avec un briquet ou une autre bougie. La conserver en main réduira fortement votre baisse de santé mentale";
                        affectedGhosts = "-";
                        tip = "Les entités peuvent souffler les bougies, cela permet de détecter sa position voire sa pièce si elle n'est pas encore trouvée";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/1/12/Candle_lit.png/revision/latest?cb=20211003102822";
                        break;
                    case "crucifix":
                        name = "Crucifix";
                        price = "30$";
                        byDefault = "non";
                        max = "2";
                        description = "Le crucifix est une petite croix qui permet d’annuler la période de chasse du fantôme à condition qu’il soit placé dans la pièce de ce dernier. Il perdra une branche lorsqu’il empêchera une attaque.";
                        manual = "Placer le crucifix dans la pièce favorite de l'entité. Lorsque celle-ci voudra chasser, si son point d'apparition se situe dans le rayon d'action du crucifix (3 mètres), elle le mangera.\n-Nombre d'utilisations : 2";
                        affectedGhosts = "Tous";
                        tip = "Dans les grandes pièces, essayer de détecter où l'entité prèfère apparaître et placer les crucifix à cet endroit là.\nPenser à espacer les crucifix, la surface d'apparition de l'entité sera réduite";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/7/7c/Crucifix.png/revision/latest?cb=20220824080746&path-prefix=fr";
                        break;
                    case "glowstick":
                        name = "Bâton Lumineux";
                        price = "20$";
                        byDefault = "non";
                        max = "2";
                        description = "Le bâton lumieux est un tube qui, lorsqu'il est activé, emet une lumière violette. Il a les mêmes fonctionnalités que la lampe UV.";
                        manual = "Allumer le bâton lumineux pour révéler les empreintes digitales ainsi que les empreintes de pas. Sa portée de détection est faible.\nDurant les 10 secondes suivantes après avoir été allumé, le bâton lumineux va perdre en luminosité, jusqu'à 50% de sa luminosité de départ. Elle ne bougera plus ensuite.";
                        affectedGhosts = "Fantôme / Poltergeist / Banshee / Djinn / Démon / Hantu / Goryo / Myling / Obake / Le Mimic";
                        tip = "Poser le bâton a des endroits où l'entité touche souvent les portes ou à côté du sel. Il sera plus simple et rapide de prendre des photos.";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/d/d9/Footprints_0.4.0.png/revision/latest/scale-to-width-down/250?cb=20211101123024";
                        break;
                    case "head mounted camera":
                        name = "Caméra Frontale";
                        price = "60$";
                        byDefault = "non";
                        max = "4";
                        description = "La caméra frontale permet comme les caméras vidéos d’afficher le point de vue du joueur qui la porte et peut également révéler des orbes fantomatiques.";
                        manual = "Equiper la caméra permet aux joueurs dans la camionnette de voir ce que vous voyez, elle permet également de détecter les 'Orbes Fantomatiques'";
                        affectedGhosts = "Banshee / Cauchemar / Revenant / Yurei / Yokai / Hantu / Onryo / Raiju / Obake / Thayé / Le Mimic (ne compte pas comme une preuve mais en est une)";
                        tip = "Peut être utile si un joueur reste dans la camionnette";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/c/cb/Head_camera.png/revision/latest?cb=20201007044801";
                        break;
                    case "lighter":
                        name = "Briquet";
                        price = "10$";
                        byDefault = "non";
                        max = "4";
                        description = "Le briquet est un simple outil permettant d'utiliser d'autres objets";
                        manual = "-Lorsque vous avez le briquet en main, allumez le et utilisez l'activation secondaire pour allumer une bougie posée au sol.\n-Permet d'allumer les bougies du Cercle d'Invocation\n-Doit être dans l'inventaire du joueur pour pouvoir allumer un bâton d'encens\n-Peut allumer le feu de camp (Camp Woodwind / Maple Lodge)";
                        affectedGhosts = "";
                        tip = "Essayer de toujours en avoir un à portée";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/4/4b/Lighter_updated.png/revision/latest/scale-to-width-down/350?cb=20220112052334";
                    case "motion sensor":
                        name = "Détécteur de Mouvements";
                        price = "100$";
                        byDefault = "non";
                        max = "4";
                        description = "Le détecteur de mouvement permet de détecter la présence d’un joueur ou du fantôme lorsqu’il passe à proximité de ce dernier.";
                        manual = "Placer le détecteur de mouvements proche de la pièce de l'entité ou dans un endroit où elle passe souvent. Lorsque celle-ci, un joueur (vivant ou mort) passera devant, le détecteur s'activera et émettera un son dans la camionnette aisni qu'une lumière";
                        affectedGhosts = "Tous";
                        tip = "Le placer à côté d'un Projecteur D.O.T.S pour voir si l'entité active le détecteur sans activer le projecteur\nLe placer loin de la pièce de l'entité pour voir s'il s'agit d'une entité qui se déplace beaucoup";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/7/78/Motion_Sensor_New.png/revision/latest?cb=20210828153407";
                        break;
                    case "parabolic microphone":
                        name = "Microphone Parabolique";
                        price = "50$";
                        byDefault = "non";
                        max = "2";
                        description = "Le microphone parabolique enregistre tous les sons émis en fonction de l’endroit où le curseur est placé. Il affiche des valeurs chiffrées sur un petit écran. Plus le son est fort, plus les valeurs seront grandes. Lorsqu’il n’y a aucun son enregistré, les valeurs restent nulles.";
                        manual = "Allumer le microphone et le pointer dans la direction de l'entité. Il permet de capter les sons paranormaux, y compris des chuchotements de l'entité en question";
                        affectedGhosts = "Tous";
                        tip = "S'en servir s'il faut distinguer un myling ou une banshee";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/c/ca/Newest_parabolic_microphone_model.png/revision/latest?cb=20210830133804";
                        break;
                    case "salt shaker":
                        name = "Sel";
                        price = "15$";
                        byDefault = "non";
                        max = "3";
                        description = "Le sel, une fois posé au sol, permet de marquer les empreintes de pas du fantôme s’il marche dedans.";
                        manual = "Poser le sel dans des endroits dans lequel l'entité passe souvent (sa pièce de préférence). Lorsqu'elle marchera dedans, une empreinte de pas apparaîtra, et si vous avez une lampe UV, vous pourrez suivre ses déplacements pendant quelques secondes";
                        affectedGhosts = "Tous";
                        tip = "A la fin d'une chasse, si l'entité disparait sur le sel, elle laissera une empreinte";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/c/c3/Salt_Render.png/revision/latest/scale-to-width-down/1200?cb=20210929051452";
                        break;
                    case "sanity pills":
                        name = "Pilules de Santé Mentale";
                        price = "45$";
                        byDefault = "non";
                        max = "4";
                        description = "La pilule de santé mentale permet de rétablir 40% de santé mentale si elle est consommée.";
                        manual = "Juste faire clic droit avec la pilule en main";
                        affectedGhosts = "-";
                        tip = "Essayez de gérer votre santé mentale grâce aux pilules afin de voir dans quelles tranches de santé mentale l'entité attaque";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/9/9a/New_Sanity_Pills.jpg/revision/latest/top-crop/width/360/height/360?cb=20210924183937";
                        break;
                    case "smudge sticks":
                        name = "Bâton d'encens";
                        price = "15$";
                        byDefault = "non";
                        max = "4";
                        description = "Le bâton d’encens laisse une traînée d’encens lorsqu’il est allumé à l’aide du briquet , afin de protéger le joueur du fantôme pendant une chasse ou dans le but d’accomplir certains objectifs";
                        manual = "Lors d'une chasse passer au travers de l'entité avec le bâton d'encens allumé va le désorienter et ne pourra pas tuer pendant quelques secondes.\nDe plus, l'entité ne pourra pas lancer de chasse pendant 1 minute 30 (peut changer en fonction de l'entité)";
                        affectedGhosts = "Tous";
                        tip = "Profiter de la sécurité apportée par le bâton d'encens pour voir si l'entité se comporte différemment à la vue d'un joueur";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/c/c7/SmudgeSticks_Render.png/revision/latest?cb=20210929051452";
                        break;
                    case "sound sensor":
                        name = "Capteur Sonore";
                        price = "80$";
                        byDefault = "non";
                        max = "4";
                        description = "Le capteur sonore retransmettera à la camionnette les sons inaudibles";
                        manual = "Placer le capteur sonore dans la maison. Regarder ensuite la carte de la camionnette. Le carré jaune est l'emplacement du détecteur, le grand cercle autour est son rayon d'action.\nLorsque l'entité va émettre des sons la barre du moniteur de son va bouger (plus ou moins en fonction de la puissance du son et de la proximité avec le détecteur)";
                        affectedGhosts = "Tous";
                        tip = "-Si vous ne parvenez pas à trouver la pièce de l'entité, placez les capteurs un peu partout dans la maison et trouvez celui qui est le plus agité\n-En en plaçant à plusieurs endroits de la maison, il est possible de savoir si l'entité se déplace beaucoup";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/6/66/Sound_sensor_0.6.png/revision/latest?cb=20220408032759";
                        break;
                    case "strong flashlight":
                        price = "50$";
                        byDefault = "non";
                        max = "4";
                        description = "La lampe de poche puissante est une version améliorée de la lampe de poche qui éclaire davantage les zones obscures.";
                        manual = "Activer la lampe de poche puissante pour voir dans le noir";
                        affectedGhosts = "-";
                        tip = "-";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/e/e2/StrongFlashlight_Render.png/revision/latest?cb=20210929051451";
                        break;
                    case "thermometer":
                        name = "Theromètre";
                        price = "30$";
                        byDefault = "non";
                        max = "3";
                        description = "Le thermomètre enregistre la température à chaque endroit  où le joueur place son curseur. En dessous de 12 degrés, le fantôme est présent dans la pièce, car il refroidit son lieu d’attachement. Si la température est négative, cela peut constituer une preuve dans votre journal.";
                        manual = "Allumer le thermomètre et se déplacer dans les pièces, la pièce de l'entité devrait être la plus froide, souvent à moins de 6°C";
                        affectedGhosts = "Djinn / Revenant / Ombre / Démon / Yurei / Oni / Hantu / Onryo / Les Jumeaux / Le Mimic / Moroï";
                        tip = "-Allumer le courant et attendre que les pièces chauffent pour utiliser le thermomètre, l'écart de températures se fera d'autant plus ressentir\n-Les températures glaciales peuvent également être trouvées sans le thermomètre, en effet, lorsque les températures dans une pièce passent sous 0°C, les joueurs se metteront à respirer du froid";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/e/e4/Thermometer_Render.png/revision/latest?cb=20210930094553";
                        break;
                    case "tripod":
                        name = "Trépied";
                        price = "25$";
                        byDefault = "non";
                        max = "5";
                        description = "Le trépied permet de placer les caméras vidéo en hauteur";
                        manual = "Prendre une caméra, viser le haut du trépied et appuyer sur la touche secondaire, la caméra va se placer sur le trépied. Lacher le trépied placera la caméra dans la même direction que vous regardez. Le poser avec l'activation secondaire la fera regarder dans le votre dos";
                        affectedGhosts = "";
                        tip = "-Placer les caméras sur trépied dans des espaces larges afin que le champ de vision soit optimal";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/0/0b/Tripod.png/revision/latest/scale-to-width-down/350?cb=20201007044625";
                        break;
                    case "objective board":
                        name = "Tableau d'objectifs";
                        byDefault = "oui";
                        description = "Permet de visualiser:\n-Le nom de l'entité\n-Les objectifs secondaires\n-Les photos prises";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/5/52/Obj_board_0.7.jpg/revision/latest/scale-to-width-down/180?cb=20220928082955";
                        break;
                    case "site map":
                        name = "Carte des lieux";
                        byDefault = "oui";
                        description = "Permet de visualiser:\n-L'emplacement des joueurs dans la maison\n-L'emplacement du disjoncteur\n-L'emplacement des détecteurs de mouvements et des capteurs sonores";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/1/13/Site_map_0.6.png/revision/latest/scale-to-width-down/180?cb=20220408034152";
                        break;
                    case "sanity monitor":
                        name = "Moniteur de Santé Mentale";
                        byDefault = "non";
                        description = "Permet de visualiser la santé mentale des membres de l'équipe. Lorsqu'un joueur est mort, il sera affiché un '?'";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/b/b9/Sanity_monitor_0.6.png/revision/latest/scale-to-width-down/180?cb=20220411120049";
                        break;
                    case "site activity monitor":
                        name = "Moniteur d'Activité Paranormale";
                        byDefault = "non";
                        description = "Permet de visualiser sur une échelle de 0 à 10 le taux d'activité de l'entité.\nUne apparition se situe entre 8 et 10\nUne chasse se situe à 10";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/8/80/Site_activity_monitor_0.6.png/revision/latest/scale-to-width-down/180?cb=20220408034106";
                        break;
                    case "computer":
                        name = "Ordinateur";
                        byDefault = "oui";
                        description = "Permet de voir au travers de toutes les caméras vidéos et frontales.\nCliquer sur la souris changera de caméra\ncliquer sur le clavier passera la caméra en vision nocturne ou inversement";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/7/70/Computer_0.6.png/revision/latest/scale-to-width-down/320?cb=20220408165738";
                        break;
                    case "sound monitor":
                        name = "Moniteur Sonore";
                        byDefault = "oui";
                        description = "Permet de visualiser les niveaux d'activité sonore émis par les capteurs sonores";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/5/5a/Sound_monitor_0.6.png/revision/latest/scale-to-width-down/180?cb=20220408034224";
                        break;
                    default: //If an error occurs, mention the bot owner
                        return interaction.reply(`<@${ownerID}>, new Error !\nRequest: \`/phasmo equipement ${equipmentToDisplay}\``);
                }

                if(price == ""){
                    //équipement présent dans la camionnette.
                    //finish embed build
                    const replyEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({name: `Requested by ${interaction.user.username}`})
                    .setTimestamp()
                    .setFooter({text: "hellBot by @Evileo#6462"})
                    .setTitle(name)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Disponible en difficulté cauchemar", value: `${byDefault}` }
                    )
                    .setImage(picture);

                    interaction.reply({embeds: [replyEmbed]});
                } else {
                    //équipement portable
                    //finish embed build
                    const replyEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({name: `Requested by ${interaction.user.username}`})
                    .setTimestamp()
                    .setFooter({text: "hellBot by @Evileo#6462"})
                    .setTitle(name)
                    .addFields(
                        { name: "Prix", value: `${price}` },
                        { name: "Equipement de départ", value: `${byDefault}` },
                        { name: "Maximum par partie", value: `${max}` },
                        { name: "Description", value: `${description}` },
                        { name: "Manuel d'utilisation", value: `${manual}` },
                        { name: "Entités détectées", value: `${affectedGhosts}` },
                        { name: "Astuce / Conseil", value: `${tip}` }
                    )
                    .setImage(picture)

                    interaction.reply({embeds: [replyEmbed]});
                }

                

            }

        } else if(chosenCommand == "cursed"){
            const cursed = ["haunted mirror", "music box", "ouija board", "summoning circle", "tarot cards", "voodoo doll"];

            const tarotCardsEffects = [
                ["The Sun (5%)"], ["Restaure l'intégralité de la santé mentale du joueur ayant tiré la carte"],
                ["The Moon (5%)"], ["Retire la totalité de la santé mentale du joueur ayant tiré la carte"],
                ["The Tower (20%)"], ["L'entité effectue une action (peut écrire et passer devant le Projecteur D.O.T.S)"],
                ["The Wheel Of Fortune (20%)"], ["Si brûle en rouge, fait perdre 25% de santé mentale au joueur l'ayant tirée, Si brûle en vert, restaure 25% de santé mentale au joueur l'ayant tirée"],
                ["The Devil (10%)"], ["L'entité fait une apparition"],
                ["Death (10%)"], ["L'entité lance une chasse maudite"],
                ["The Hermit (10%)"], ["Téléporte l'entité dans sa pièce et l'empêche d'en sortir pendant une minute (prend fin en cas d'apparition, de chasse ou de nouvelle carte tirée)"],
                ["The High Pretress (2%)"], ["Rend la vie à un joueur décédé aléatoire ou empêche la prochaine mort (si aucun joueur n'est décédé)"],
                ["The Hanged Man (1%)"], ["Tue instantanément le joueur ayant tiré la carte"],
                ["The Fool (17%)"], ["Prend l'apparence d'une autre carte avant de se révéler, n'a aucun effet"]
            ];

            let tarot = false;

            let name = "";
            let cost = "";
            let description = "";
            let tip = "";
            let place = "";
            let picture = "";

            let loop = 1;
            let loops = false;
            if(chosenName === "all"){
                loop = cursed.length;
                loops = true;
            }

            for(i = 0; i < loop; i++){
                let cursedToDisplay = chosenName;
                if(loops == true){
                    cursedToDisplay = cursed[i];
                }

                switch(cursedToDisplay){
                    case "haunted mirror":
                        name = "Miroir Hanté";
                        cost = "10% de santé mentale par seconde pour le joueur qui regarde dedans";
                        description = "Le miroir hanté est l’un des six objets maudits. Son utilisation permet à un joueur d’entrevoir la pièce favorite de l’entité, au prix d’une large portion de santé mentale qui dépend du temps passé à regarder le miroir. Connaissez-vous la superstition qui dit que casser un miroir était signe de malchance ? Dans le doute, restez prudents…";
                        place = "Tanglewood: Dans le salon, immédiatement devant la porte de la Master Bedroom, au mur\nRidgeview: Au rez-de-chaussée, au dessus de la commode devant la porte de l’escalier menant au sous-sol\nEdgefield: Immédiatement à droite à l’entrée, au mur, en bas des escaliers\nWillow: Dans le garage, dans le coin de la petite buanderie\nBleasdale: Dans la pièce bureau, à gauche de l’entrée, au mur du fond\nGrafton: Au dessus du radiateur du salon, près de l’entrée\nHigh School: A l’entrée, derrière un des poteaux de droite\nPrison: A l’entrée, sur un banc de sièges\nMaple Lodge: Dans la tente bleue, à gauche de l’entrée, devant un sac de couchage rouge\nSunny Meadows: Autel de la pièce du rituel, en face de l'Entrée";
                        tip = "A utiliser si vous connaissez le bâtiment et que vous ne connaissez pas la pièce de l'entité ou lorsque vous souhaitez lancer un chasse. Inutile sinon.";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/7/7b/Cursed_Mirror.jpg/revision/latest?cb=20220303041525";
                        break;
                    case "music box":
                        name = "Boîte à Musique";
                        cost = "Dépend du temps pendant laquelle la mélodie a été écoutée et de la distance avec la boîte. Varie de 0% à 77.5%";
                        description = "La boîte à musique est l’un des six objets maudits. Son utilisation a pour conséquence de faire perdre une grande quantité de santé mentale aux joueurs qui entendent les notes de sa musique, tout en forçant l’entité à chanter. Se rapprocher trop de l’entité avec la boîte à musique est cependant extrêmement dangereux.";
                        place = "Tanglewood: Dans la Nurserie, au rez-de-chaussée, sur l’étagère\nRidgeview: A l’étage, dans la chambre immédiatement tout droit à gauche en montant\nEdgefield: Près d’un cadre sur le premier meuble du salon, à gauche de l’entrée\nWillow: Dans le salon, immédiatement à gauche en entrant dans la maison\nBleasdale: Dans le salon, près du téléphone, au rez-de-chaussée\nGrafton: Dans l’étagère à l’entrée\nHigh School: A l’entrée, sur un banc à droite\nPrison: A l’entrée, sur la table à gauche\nMaple Lodge: Sur la petite table devant l’entrée du chalet\nSunny Meadows: Autel de la pièce du rituel, en face de l'Entrée";
                        tip = "L'allumer et la lancer par terre va la casser et l'entité va lancer une chasse maudite.";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/1/11/Music_Box_Model.jpg/revision/latest?cb=20211210222255";
                        break;
                    case "ouija board":
                        name = "Planche Ouija";
                        cost = "Le coût en santé mentale dépend de la question:\n-40%\nOù êtes-vous ?\n\n-20% Où est l'os ?\nRépondez-vous à tout le monde ?\n\n-5%\nQuelle est ma santé mentale ?\nQuel âge avez-vous ? (utile pour déterminer le Thayé)\nCache-cache ? (déclenche une chasse maudite après 5 secondes)";
                        description = "La planche Ouija est l’un des six objets maudits. Elle permet d’interagir avec l’entité en lui posant des questions. Son utilisation a pour conséquence de faire perdre une certaine quantité de santé mentale au joueur qui interagit avec. Il est indispensable de lui dire « au revoir » à la fin de l’utilisation, sinon…";
                        place = "Tanglewood: Au fond du sous-sol\nRidgeview: Dans la buanderie, au rez-de chaussée à gauche\nEdgefield: Dans la Buanderie, au rez-de-chaussée au fond de la Cuisine\nWillow: Dans le Garage, sur une machine à laver\nBleasdale: Dans l’atelier, au rez-de-chaussée, tout au fond du couloir\nGrafton: Dans la partie stockage de la Master Bedroom, au rez-de-chaussée\nHigh School: A l’entrée, derrière l’un des poteaux de gauche\nPrison: A l’entrée, derrière la table à gauche\nMaple Lodge: Dans le débarras derrière les toilettes\nSunny Meadows: Autel de la pièce du rituel, en face de l'Entrée";
                        tip = "L'utiliser pour obtenir la pièce de l'entité dès le début de la partie si vous ne l'avez pas trouvée avant. Puis aller prendre une pilule.";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/2/2f/Ouija_Board_New.png/revision/latest?cb=20211210172553";
                        break;
                    case "summoning circle":
                        name = "Cercle d'Invocation";
                        cost = "16% de santé mentale par bougie à tous les joueurs situés à moins de 4 mètres";
                        description = "Le cercle d’invocation est l’un des six objets maudits. Pour l’activer, les 5 bougies de son pentacle doivent être activées, au prix d’une large portion de santé mentale. Lors de son activation, l’entité déclenche une chasse maudite, mais reste coincée et visible dans le cercle pendant quelques secondes avant de se mettre à pourchasser les enquêteurs. Évitez cependant de rester trop longtemps, ou de l’activer alors qu’une chasse est déjà en cours, sinon…";
                        place = "Tanglewood: Au milieu du sous-sol\nRidgeview: En bas de l’escalier du sous-sol\nEdgefield: Au milieu de la pièce du sous-sol\nWillow: Au milieu du sous-sol\nBleasdale: Au milieu du grenier\nGrafton: Au fond du Stockage-grenier\nHigh School: A l’entrée, tout droit, au croisement avec le couloir principal\nPrison: A l’entrée, tout droit, devant les portes principales\nMaple Lodge: Au pied de l’escalier dans le châlet\nSunny Meadows: Autel de la pièce du rituel, en face de l'Entrée";
                        tip = "Permet d'obtenir facilement la photo de l'entité";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/6/64/Circle.png/revision/latest?cb=20211211042818";
                        break;
                    case "tarot cards":
                        tarot = true;
                        name = "Cartes de Tarot";
                        cost = "Tirer une carte ne coûte pas de santé mentale";
                        description = "Le paquet de cartes de tarot est l’un des six objets maudits. Son utilisation vous fait tirer l’une des dix cartes du paquet, qui prend effet instantanément. L’ensemble des effets comprend : interaction, chasse maudite, résurrection… L’utilisation du paquet de cartes de tarot est limité, mais ses effets sont très puissants. ";
                        place = "Tanglewood: Dans le salon, sur la table basse du fond\nRidgeview: Immédiatement à droite à l’entrée, à côté des clés de voiture\nEdgefield: Immédiatement à droite à l’entrée, à côté des clés de voiture\nWillow: Dans le salon, sur la table basse, à côté de la télécommande\nBleasdale: Sur le bureau de la pièce bureau, à gauche de l’entrée\nGrafton: Sur un coin de la table de la salle à manger\nHigh School: A l’entrée, sur un banc à gauche\nPrison: A l’entrée, sur la table à gauche\nMaple Lodge: Dans le chemin Nord, au fond du passage de gauche, sur la table blanche\nSunny Meadows: Autel de la pièce du rituel, en face de l'Entrée";
                        tip = "Tirer les cartes en fin de partie ou lorsqu'une action particulière est recherchée\nTirer une carte pendant une chasse la transformera automatiquement en F ool";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/2/2a/CartesTarot.png/revision/latest?cb=20220829135020&path-prefix=fr";
                        break;
                    case "voodoo doll":
                        name = "Poupée Vaudou";
                        cost = "5% par pins enfoncé";
                        description = "La poupée vaudou est l’un des six objets maudits. Lors de son utilisation, un des 10 pins est enfoncé. S’il s’agit du pin du cœur, vous subirez une chasse maudite, sinon l’entité sera forcée de faire une interaction. Vous devriez cependant éviter de l’utiliser si vous manquez de santé mentale…";
                        place = "Tanglewood: Dans le garage, sur la poubelle\nRidgeview: Au rez-de-chaussée, sur le banc à côté du piano dans le couloir\nEdgefield: Sur le lit de la grande chambre bleue, en face de la Master Bedroom à l’étage\nWillow: Dans l’armoire de la chambre au fond à droite\nBleasdale: A l’étage au fond du couloir sur un fauteuil\nGrafton: Dans la Nurserie, à l’étage, sur la valise marron\nHigh School: A l’entrée, sur le banc, tout droit\nPrison: A l’entrée, sur la table à gauche\nMaple Lodge: Du côté des bûches du feu de camp\nSunny Meadows: Autel de la pièce du rituel, en face de l'Entrée";
                        tip = "Permet d'obtenir l'Ecriture Fantomatique ou le Projecteur D.O.T.S";
                        picture = "https://static.wikia.nocookie.net/phasmophobia/images/e/e2/Voodoo_Doll_New.jpg/revision/latest?cb=20211210173413";
                        break;
                    default: //If an error occurs, mention the bot owner
                        return interaction.reply(`<@${ownerID}>, new Error !\nRequest: \`/phasmo cursed ${cursedToDisplay}\``);  
                }

                if(tarot == true){
                    //Il s'agit des cartes de tarot
                    const replyEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({name: `Requested by ${interaction.user.username}`})
                    .setTimestamp()
                    .setFooter({text: "hellBot by @Evileo#6462"})
                    .setTitle(name)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Coût d'activation", value: `${cost}` },
                        { name: "Emplacement", value: `${place}` },
                        { name: "Astuces", value: `${tip}` },
                        { name: `${tarotCardsEffects[0]}`, value: `${tarotCardsEffects[1]}` },
                        { name: `${tarotCardsEffects[2]}`, value: `${tarotCardsEffects[3]}` },
                        { name: `${tarotCardsEffects[4]}`, value: `${tarotCardsEffects[5]}` },
                        { name: `${tarotCardsEffects[6]}`, value: `${tarotCardsEffects[7]}` },
                        { name: `${tarotCardsEffects[8]}`, value: `${tarotCardsEffects[9]}` },
                        { name: `${tarotCardsEffects[10]}`, value: `${tarotCardsEffects[11]}` },
                        { name: `${tarotCardsEffects[12]}`, value: `${tarotCardsEffects[13]}` },
                        { name: `${tarotCardsEffects[14]}`, value: `${tarotCardsEffects[15]}` },
                        { name: `${tarotCardsEffects[16]}`, value: `${tarotCardsEffects[17]}` },
                        { name: `${tarotCardsEffects[18]}`, value: `${tarotCardsEffects[19]}` }
                    )
                    .setImage(picture);

                    interaction.channel.send({embeds: [replyEmbed]});
                } else {
                    //Il ne s'agit pas des cartes de tarot
                    const replyEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({name: `Requested by ${interaction.user.username}`})
                    .setTimestamp()
                    .setFooter({text: "hellBot by @Evileo#6462"})
                    .setTitle(name)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Coût d'activation", value: `${cost}` },
                        { name: "Emplacement", value: `${place}` },
                        { name: "Astuces", value: `${tip}` }
                    )
                    .setImage(picture)

                    interaction.channel.send({embeds: [replyEmbed]});
                }
            }
        } else if(chosenCommand == "astuces"){
            switch(chosenName){
                case "bronze-trophy":
                    const replyEmbed1 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({name: `Requested by ${interaction.user.username}`})
                    .setTitle("Trophée de Bronze")
                    .setDescription("Conseils:\nConnaître tous les équipements\nAvoir du temps et de la patience, ce trophée prend du temps à être obtenu (la partie dure environ *10 à 30 minutes* en fonction de la position de l'entité)")
                    .setImage("https://pbs.twimg.com/media/FgqMjTSXgAM5gB6.jpg");

                    const replyEmbed2 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Informations importantes")
                    .setDescription("Le trophée de Bronze peut être obtenu en terminant *Sunny Meadows* en **solo** avec un multiplicateur de difficulté de **x15**\nPour pouvoir l'obtenir, il faudra remplir les **3 objectifs secondaires** et obtenir la **photo de l'entité**")

                    const replyEmbed3 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Paramètres de difficulté")
                    .setDescription("__JOUEUR:__\n-Santé Mentale Initiale: **0**\n-Santé Mentale Récupérée: **50%**\n-Taux de Perte de Santé Mentale: **50%**\n-Sprint: **Off**\n-Vitesse de Déplacement: **100%**\n-Lampes Torches: **Off**\n-Perte des objets: **On**\n\n__ENTITE:__\n-Vitesse de Déplacement: **150%**\n-Fréquence de Déplacements: **Faible**\n-Changement de pièce: **-**\n-Nombre d'Interactions: **Elevé**\n-Fréquence des Evènements: **Elevée**\n-Entité Amicale: **Off**\n-Période de Grâce: **0**\n-Durée des Chasses: **Elevée**\n-Preuves Apportées: **3**\n-Probabilité des Empreintes: **100%**\n-Durée des Empreintes: **30**\n\n__CONTRAT:__\n-Temps de Préparation: **0**\n-Météo: **Pluie forte**\n-Portes Ouvertes: **-**\n-Caches Disponibles: **-**\n-Moniteurs: **Off**\n-Disjoncteur: **Cassé et Non visible**")

                    const replyEmbed4 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Déroulement de la partie")
                    .setDescription("Vérifier que les missions soient **accomplissables hors chasse**. Relancer sinon.\nApporter tous les équipements à l'entrée.\nVous équiper d'une bougie, d'un briquet et d'un appareil photo. La bougie devra être allumée et sur vous **en permanence**.\nTraverser Sunny Meadows jusqu'à tomber sur une porte ouverte, il s'agit de la porte de la **pièce de l'entité**.\nApporter un à un les équipements vous permettant de trouver les preuves\n**Provoquer l'entité** pour obtenir une apparition et donc, la photo.\nPrendre des pilules.\nTerminer les objectifs et trouver l'entité si ce n'est pas déjà fait")
                    .setTimestamp()
                    .setFooter({text: "hellBot by @Evileo#6462"})

                    interaction.reply({embeds: [replyEmbed1, replyEmbed2, replyEmbed3, replyEmbed4]});
                    break;
                case "easy-money":
                    const replyEmbed5 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({name: `Requested by ${interaction.user.username}`})
                    .setTitle("Argent Facile")
                    .setDescription("Prérequis:\n-Connaître toutes les entités du jeu et leurs spécificités\n-Connaître les temps entre les chasses")
                    //.setImage("https://pbs.twimg.com/media/FgqMjTSXgAM5gB6.jpg");

                    const replyEmbed6 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Informations")
                    .setDescription("Ce mode de jeu peut être soit très simple, soit impossible.\nS'il s'agit d'une entité différentiable en chasse, la partie sera très rapide.\nSi l'entité n'est pas différentiable en chasse, il faudra tester toutes les entités restantes.\nSeules 3 entités sont indifférentiables : le cauchemar, le djinn, le goryo")

                    const replyEmbed7 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Paramètres de difficulté")
                    .setDescription("__JOUEUR:__\n-Santé Mentale Initiale: **0**\n-Santé Mentale Récupérée: **0%**\n-Taux de Perte de Santé Mentale: **150%**\n-Sprint: **Off**\n-Vitesse de Déplacement: **100%**\n-Lampes Torches: **Off**\n-Perte des objets: **On**\n\n__ENTITE:__\n-Vitesse de Déplacement: **100%**\n-Fréquence de Déplacements: **Elevée**\n-Changement de pièce: **Elevé**\n-Nombre d'Interactions: **Faible**\n-Fréquence des Evènements: **Faible**\n-Entité Amicale: **Off**\n-Période de Grâce: **0**\n-Durée des Chasses: **Elevée**\n-Preuves Apportées: **0**\n\n__CONTRAT:__\n-Temps de Préparation: **0**\n-Météo: **Pluie forte**\n-Portes Ouvertes: **Moyen**\n-Caches Disponibles: **très Elevée**\n-Moniteurs: **Off**\n-Disjoncteur: **Cassé et Non visible**")

                    const replyEmbed8 = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Déroulement de la partie")
                    .setDescription("Apporter tous les équipements à l'entrée de la maison.\nUn joueur rentre avec un bâton d'encens et va se cacher immédiatement.\nLorsque la chasse se termine, et lancer le chronomètre.\nPoser le sel, mettre des équipements aux endroits importants et retourner se cacher.\nEssayer d'accomplir les objectifs secondaires.\n\nSi l'entité est trouvée et les 3 missions sont accomplies, la partie devrait rapporter 800 à 900$ environ.")
                    .setTimestamp()
                    .setFooter({text: "hellBot by @Evileo#6462"})

                    interaction.reply({embeds: [replyEmbed5, replyEmbed6, replyEmbed7, replyEmbed8]});
                    break; 
                default: //If an error occurs, mention the bot owner
                    return interaction.reply(`<@${ownerID}>, new Error !\nRequest: \`/phasmo astuces ${chosenName}\``);
            }
        } 
	}
};