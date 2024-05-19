import { Command } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";
import settingsJson from "../../../../settings.json" with { type: "json" };


new Command({
    name: "turista",
    description: "Lista todos os turistas atuais do servidor.",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
      const turistas = interaction.guild.roles.cache.filter(role => role.name === "Turista");
      const members = turistas.map(turista => turista.members.map(member => member.user.username));

      const membersList = members.flat().map(member => "• " + member);

      const embed = createEmbed({
        title: "Turistas atuais do servidor:",
        description: brBuilder(
          ...membersList
        ),
        color: settingsJson.colors.primary
      });

      interaction.reply({ content: "Done!"});
      interaction.channel?.send({ embeds: [embed]});
    }
});