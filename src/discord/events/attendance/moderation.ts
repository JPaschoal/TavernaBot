import { Event } from "#base";
import { EmbedBuilder, TextChannel } from "discord.js";

new Event({
  name: "Moderation",
  event: "messageCreate",
  run(message) {
    if (message.channel.id !== "1241637598271901778") return;
    if (!message.author.bot) {
      const embed = new EmbedBuilder()
        .setTitle(`${message.author.displayName} seu mula, você não pode falar aqui!`)
        .setDescription("Se quiser saber quem são os turistas, use o comando `/turista` ou `/montartime` no chat.")
        .setColor("#FF0000");

      const channel = message.guild?.channels.cache.get("1241637598271901778") as TextChannel | undefined;

      channel?.send({ embeds: [embed] });

      message.delete();
    }
  },
});