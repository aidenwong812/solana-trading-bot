const { trim } = require('@/utils');

const description = () => `
  Blazingly-fast trading at your fingertips. Use /start to open the main menu and start using all our features - fast swaps, new token alerts, trade tracking and PNL.
`;

const shortDescription = () =>
  `Make More Money Trading with Solana's Fastest Telegram Bot.`;

module.exports = {
  description: () => trim(description()),
  shortDescription: () => trim(shortDescription()),
};
