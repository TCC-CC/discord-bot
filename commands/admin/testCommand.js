import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command'),
  async execute(interaction) {
    await interaction.reply('lol hi')
  },
};
