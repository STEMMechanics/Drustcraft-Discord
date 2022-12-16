const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('How to join the server'),
	async execute(interaction) {
		return interaction.reply('Point your Java Minecraft client to **play.drustcraft.com.au**. Version 1.19.2 is required and you need to enable resource packs');
	},
};
