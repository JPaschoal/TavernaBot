import { Event,  } from "#base";
import { EmbedBuilder, TextChannel } from "discord.js";

new Event({
    name: "Presence",
    event: "voiceStateUpdate",
    async run(oldState, newState){

      if (  
        newState.channelId === null || // User left the channel
        newState.channelId === oldState.channelId || // Event triggered by other action than joining a channel
        oldState.channelId !== null || // User changed channel
        newState.member?.user.bot // User is a bot
      ) return;

      const user = newState.member?.displayName;
      const channelName = newState.channel?.name;

      const embed = new EmbedBuilder()
        .setTitle("Presente Professor!")
        .setDescription(`O mula do ${user} se conectou no canal ${channelName}`)
        .setColor("#00FF00")
        .setTimestamp();
      
        const channel = oldState.guild?.channels.cache.get("1241637598271901778") as TextChannel | undefined;

        // check if the user already has a message in the channel today
        const messages = await channel?.messages.fetch();
        const today = new Date().toLocaleDateString();
        const todayMessages = messages?.filter((msg) => new Date(msg.createdTimestamp).toLocaleDateString() === today);
        const userMessage = todayMessages?.find((msg) => msg?.embeds[0]?.description?.includes(user!));
        
        if(userMessage) return;

        channel?.send({ embeds: [embed] });
    }
  }
);