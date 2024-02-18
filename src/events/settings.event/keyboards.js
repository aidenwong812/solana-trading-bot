const settingsKeyboard = ({
  minPosValue,
  autoBuy,
  autoBuyAmount,
  autoSell,
  autoSellAmount,
  leftBuyAmount,
  rightBuyAmount,
  leftSellAmount,
  rightSellAmount,
  buySlippage,
  sellSlippage,
  autoBuySlippage,
  autoSellSlippage,
  gasFee,
}) => [
  [{ text: '--- GENERAL SETTINGS ---', callback_data: 'none' }],
  [
    {
      text: `✎ Min Pos Value: $${minPosValue}`,
      callback_data: 'editSetting minPosValue',
    },
  ],
  [{ text: '--- TRANSACTION PRIORITY ---', callback_data: 'none' }],
  [
    {
      text: `${gasFee === 0.0075 ? '✅ ' : ''}Fast 🦄`,
      callback_data: `toggleSetting gasFee 75`,
    },
    {
      text: `${gasFee === 0.0099 ? '✅ ' : ''}Turbo 🚀`,
      callback_data: `toggleSetting gasFee 99`,
    },
    {
      text: `${gasFee !== 0.0075 && gasFee !== 0.0099 ? '✅ ' : ''}Custom Fee`,
      callback_data: `editSetting gasFee`,
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
      text: '--- AUTO SELL ---',
      callback_data: 'none',
    },
  ],
  [
    {
      text: `${autoSell ? '🟢 Enabled' : '🔴 Disabled'} `,
      callback_data: `toggleSetting autoSell ${autoSell ? 0 : 1}`,
    },
    {
      text: `✎ ${autoSellAmount} %`,
      callback_data: 'editSetting autoSellAmount',
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
      text: `✎ Auto Buy: ${autoBuySlippage}%`,
      callback_data: 'editSetting autoBuySlippage',
    },
    {
      text: `✎ Auto Sell: ${autoSellSlippage}%`,
      callback_data: 'editSetting autoSellSlippage',
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
