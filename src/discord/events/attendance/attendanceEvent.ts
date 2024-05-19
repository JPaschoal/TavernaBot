import { Event,  } from "#base";
import { EmbedBuilder, TextChannel } from "discord.js";

new Event({
    name: "Presence",
    event: "voiceStateUpdate",
    async run(oldState, newState){

      if(newState.channelId === null) return;
      if(newState.channelId === oldState.channelId) return;

      const user = newState.member?.displayName;
      const channelName = newState.channel?.name;

      const embed = new EmbedBuilder()
        .setTitle("Marcando presença!")
        .setDescription(`O mula ${user} se conectou no canal ${channelName}`)
        .setColor("#FF0000")
        .setTimestamp();
      
        const channel = oldState.guild?.channels.cache.get("1241552848848945222") as TextChannel | undefined;
        channel?.send({ embeds: [embed] });
    }
  }
);