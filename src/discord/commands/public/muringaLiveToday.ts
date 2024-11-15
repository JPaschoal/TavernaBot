import { Command } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";
import settingsJson from "../../../../settings.json" with { type: "json" };
import { getOAuthToken, getStream, getVideos } from "#functions";

new Command({
  name: "murilotrabalhouhoje",
  description: "Verifica se o Muringa trabalhou hoje.",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {

    const token = await getOAuthToken();

    const streams = await getStream(token);

    //check if stream is live
    if (streams.data.length > 0) {
      const embed = createEmbed({
        title: "Murilo está trabalhando!!!",
        description: brBuilder(
          `• Jogando: ${streams.data[0].game_name} \n`,
          "• Link da live: [Clique aqui](https://twitch.tv/forgetfulxx)"
        ),
        color: settingsJson.colors.info
      });

      await interaction.reply({ embeds: [embed] });
      return;
    }

    const videoData = await getVideos(token);

    const today = new Date();
    // gmt -3
    today.setHours(today.getHours() - 3);
    //filter videos from today
    const videosToday = videoData.data.filter((video: any) => {
      const videoDate = new Date(video.created_at);
      return videoDate.getDate() === today.getDate() && videoDate.getMonth() === today.getMonth() && videoDate.getFullYear() === today.getFullYear();
    });
    
    let totalDurationSeconds = 0;

    if (videosToday.length > 0) {
      videosToday.forEach(videosToday => {
            const duration = videosToday.duration;
            let hours = 0, minutes = 0, seconds = 0;

            const hoursMatch = duration.match(/(\d+)h/);
            const minutesMatch = duration.match(/(\d+)m/);
            const secondsMatch = duration.match(/(\d+)s/);

            if (hoursMatch) hours = parseInt(hoursMatch[1]);
            if (minutesMatch) minutes = parseInt(minutesMatch[1]);
            if (secondsMatch) seconds = parseInt(secondsMatch[1]);

            totalDurationSeconds += (hours * 3600) + (minutes * 60) + seconds;
        });
    }

    const totalDurationHours = Math.floor(totalDurationSeconds / 3600);

    const message = totalDurationHours > 0 ? `Murilo trabalhou hoje por ${totalDurationHours} horas` : "Murilo não trabalhou hoje";

    const embed = createEmbed({
      title: "Muringa Trabalhou Hoje?",
      description: brBuilder(
        `• ${message} \n`,
      ),
      color: settingsJson.colors.info
    });

    await interaction.reply({ embeds: [embed] });
  }
});

