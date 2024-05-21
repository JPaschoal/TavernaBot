import { Command } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";
import settingsJson from "../../../../settings.json" with { type: "json" };

new Command({
  name: "montartime",
  description: "Monta um time aleatório com os membros do servidor.",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    // get members connected to the voice channel
    const voiceChannel = interaction.member?.voice.channel;
    const members = voiceChannel?.members.map(member => member.user.username);

    // shuffle members
    const shuffledMembers = members?.sort(() => Math.random() - 0.5);

    // create teams
    const team1 = shuffledMembers?.slice(0, Math.floor(shuffledMembers.length / 2));
    const team2 = shuffledMembers?.slice(Math.floor(shuffledMembers.length / 2));

    // send message
    const embed = createEmbed({
      title: "Times montados:",
      description: brBuilder(
        `**Time 1:**\n${team1?.map(member => "• " + member).join("\n")}`,
        `\n**Time 2:**\n${team2?.map(member => "• " + member).join("\n")}`
      ),
      color: settingsJson.colors.nitro
    });

    await interaction.reply({ embeds: [embed] });

  }
});