import { Command } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";
import settingsJson from "../../../../settings.json" with { type: "json" };

new Command({
  name: "help",
  description: "Lista todos os comandos disponíveis.",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const embed = createEmbed({
      title: "Comandos disponíveis:",
      description: brBuilder(
        "• `/montartime` - Monta um time aleatório com os membros do servidor.",
        "• `/turista` - Lista os membros que não estão conectados ao canal de voz.",
        "• `/murilotrabalhouhoje` - Verifica se o Muringa trabalhou hoje.",
        "• `/murilouptime` - Verifica a quanto tempo o Muringa está online."
      ),
      color: settingsJson.colors.info
    });

    await interaction.reply({ embeds: [embed] });
  }
});