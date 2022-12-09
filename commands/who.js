const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('who')
		.setDescription('Who are you?'),
	async execute(interaction) {
		return interaction.reply('Not really sure who you are. Tried looking in the mirror?');
	},
};