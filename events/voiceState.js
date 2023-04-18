const { Events, ChannelType } = require("discord.js");

module.exports = {
	name: Events.VoiceStateUpdate,
	once: false,
	async execute(oldVoiceState, newVoiceState){
		const phasmoMaps = ["Tanglewood", "Ridgeview", "Bleasdale", "Grafton", "Edgefield", "Willow", "Prison", "High School", "Sunny Meadows", "Maple Lodge", "Woodwind Camp"]
        const phasmoMap = phasmoMaps[Math.floor(Math.random() * phasmoMaps.length)];

        //creates a temporary channel if the joined channel has been created by the bot and moves the user to the new one
        if(newVoiceState.channelId != null){
            const joinedChannel = newVoiceState.guild.channels.cache.get(newVoiceState.channelId);
            const newChannelLimit = joinedChannel.userLimit;
            const category = joinedChannel.parent.id;

            var createVoice;

            //specialized new voice channels
            if(newVoiceState.channelId == "1028726432605683823"){
                const channelName = phasmoMap;

                createVoice = await newVoiceState.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildVoice,
                    parent: category,
                    userLimit: 4,
                    bitrate: 66666
                });
            } else if(joinedChannel.bitrate == 66665){ //common voice channels
                channelName = newVoiceState.member.user.tag;
                //create the temp channel
                createVoice = await newVoiceState.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildVoice,
                    parent: category,
                    userLimit: newChannelLimit,
                    bitrate: 66666
                });
            }

            //move user
            joinedChannel.members.forEach((member) => {
                member.voice.setChannel(createVoice).catch(err => console.log(err));
            });
        }

        //deletes the temporary channel if no one is in it
        if(oldVoiceState.channelId != null){
            const channelToDelete = oldVoiceState.guild.channels.cache.get(oldVoiceState.channelId);
            if(channelToDelete.members.size < 1 && channelToDelete.bitrate == 66666){
                channelToDelete.delete();
            }
        }
	},
};