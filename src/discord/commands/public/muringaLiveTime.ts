import { Command } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";
import settingsJson from "../../../../settings.json" with { type: "json" };
import { getOAuthToken, getStream } from "#functions";

new Command({
  name: "murilouptime",
  description: "Verifica a quanto tempo o Muringa está online.",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {

    const token = await getOAuthToken();

    const streams = await getStream(token);

    console.log(streams);

    // get Stream Up Time
    const stream = streams.data[0];
    const startedAt = new Date(stream.started_at);
    const now = new Date();
    const diff = now.getTime() - startedAt.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);
    const diffMinutes = Math.floor(diff / 1000 / 60 % 60);

    const timeMessage = "• Murilo está online a " + diffHours + " horas e " + diffMinutes + " minutos.";

    const embed = createEmbed({
      title: "Live: ",
      description: brBuilder(
        `${timeMessage} \n`,
        `• Jogando: ${stream.game_name} \n`,
        "• Link da live: [Clique aqui](https://twitch.tv/forgetfulxx)"

      ),
      color: settingsJson.colors.info
    });

    await interaction.reply({ embeds: [embed] });
  }
});

