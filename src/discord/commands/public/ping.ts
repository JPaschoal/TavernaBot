import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";

new Command({
	name: "ping",
	description: "Replies with pong 🏓",
	dmPermission: false,
	type: ApplicationCommandType.ChatInput,
	async run(interaction){

		await interaction.reply({ fetchReply, ephemeral, content: "pong" });
	}
});