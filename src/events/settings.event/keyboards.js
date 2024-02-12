const settingsKeyboard = ({
  announcements,
  minPosValue,
  autoBuy,
  autoBuyAmount,
  leftBuyAmount,
  rightBuyAmount,
  leftSellAmount,
  rightSellAmount,
  buySlippage,
  sellSlippage,
}) => [
  [{ text: '--- GENERAL SETTINGS ---', callback_data: 'none' }],
  [
    {
      text: `${announcements ? '🟢' : '🔴'} Announcements`,
      callback_data: `toggleSetting announcements ${announcements ? 0 : 1}`,
    },
    {
      text: `✎ Min Pos Value: $${minPosValue}`,
      callback_data: 'editSetting minPosValue',
    },
  ],
  [
    {
      text: '--- AUTO BUY ---',
      callback_data: 'none',
    },
  ],
  [
    {
      text: `${autoBuy ? '🟢 Enabled' : '🔴 Disabled'} `,
      callback_data: `toggleSetting autoBuy ${autoBuy ? 0 : 1}`,
    },
    {
      text: `✎ ${autoBuyAmount} SOL`,
      callback_data: 'editSetting autoBuyAmount',
    },
  ],
  [
    {
      text: '--- BUY BUTTONS CONFIG ---',
      callback_data: 'none',
    },
  ],
  [
    {
      text: `✎ Left: ${leftBuyAmount} SOL`,
      callback_data: 'editSetting leftBuyAmount',
    },
    {
      text: `✎ Right: ${rightBuyAmount} SOL`,
      callback_data: 'editSetting rightBuyAmount',
    },
  ],
  [
    {
      text: '--- SELL BUTTONS CONFIG ---',
      callback_data: 'none',
    },
  ],
  [
    {
      text: `✎ Left: ${leftSellAmount}%`,
      callback_data: 'editSetting leftSellAmount',
    },
    {
      text: `✎ Right: ${rightSellAmount}%`,
      callback_data: 'editSetting rightSellAmount',
    },
  ],
  [
    {
      text: '--- SLIPPAGE CONFIG ---',
      callback_data: 'none',
    },
  ],
  [
    {
      text: `✎ Buy: ${buySlippage}%`,
      callback_data: 'editSetting buySlippage',
    },
    {
      text: `✎ Sell: ${sellSlippage}%`,
      callback_data: 'editSetting sellSlippage',
    },
  ],
  [
    {
      text: 'Close',
      callback_data: 'close',
    },
  ],
];

module.exports = {
  settingsKeyboard,
};
