import { Command } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import settingsJson from "../../../../settings.json" with { type: "json" };
import { getOAuthToken, getStream } from "#functions";

new Command({
  name: "streameruptime",
  description: "Verifica a quanto tempo o streamer está online.",
  dmPermission: false,
  options: [
    {
      name: "streamer",
      description: "Streamer que deseja verificar o tempo online.",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {

    const { options } = interaction;

    const streamer = options.getString("streamer", true);

    const token = await getOAuthToken();

    const streams = await getStream(token, streamer);

    if(streams.data.length === 0) {
      const embed = createEmbed({
        title: `${streamer} está offline.`,
        description: brBuilder(
          "• Não está transmitindo no momento."
        ),
        color: settingsJson.colors.danger
      });

      await interaction.reply({ embeds: [embed] });
      return;
    }

    // get Stream Up Time
    const stream = streams.data[0];
    const startedAt = new Date(stream.started_at);
    const now = new Date();
    const diff = now.getTime() - startedAt.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);
    const diffMinutes = Math.floor(diff / 1000 / 60 % 60);

    const timeMessage = `• ${streamer} está online a ` + diffHours + " horas e " + diffMinutes + " minutos.";

    const embed = createEmbed({
      title: "Live: ",
      description: brBuilder(
        `${timeMessage} \n`,
        `• Jogando: ${stream.game_name} \n`,
        `• Link da live: [Clique aqui](https://twitch.tv/${streamer})`

      ),
      color: settingsJson.colors.info
    });

    await interaction.reply({ embeds: [embed] });
  }
});

