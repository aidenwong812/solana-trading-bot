const positionKeyboard = ({
  tokenAccount: { mint, ata, symbol },
  index,
  settings,
}) => [
  [{ text: '❌ Close', callback_data: 'close' }],
  [
    { text: '(1%) Tip SOL Amount', callback_data: `tipSOLAmount` },
  ],
  [
    {
      text: `🚀 Buy ${settings.leftBuyAmount} SOL`,
      callback_data: `buyAmount ${mint} ${settings.leftBuyAmount}`,
    },
    {
      text: `🚀 Buy ${settings.rightBuyAmount} SOL`,
      callback_data: `buyAmount ${mint} ${settings.rightBuyAmount}`,
    },
    { text: '🚀 Buy X SOL', callback_data: `buyX ${mint}` },
  ],
  [
    { text: '◀️ Prev', callback_data: `refreshManagePositions ${index - 1}` },
    { text: `${symbol}`, callback_data: 'none' },
    { text: 'Next ▶️', callback_data: `refreshManagePositions ${index + 1}` },
  ],
  [
    {
      text: `🎯 Sell ${settings.leftSellAmount}%`,
      callback_data: `sellPercent ${ata} ${settings.leftSellAmount}`,
    },
    {
      text: `🎯 Sell ${settings.rightSellAmount}%`,
      callback_data: `sellPercent ${ata} ${settings.rightSellAmount}`,
    },
    { text: '🎯 Sell X %', callback_data: `sellX ${ata}` },
  ],
  [
    { text: '📈 Explorer', url: `https://solscan.io/account/${mint}` },
    {
      text: '📈 Birdeye',
      url: `https://birdeye.so/token/${mint}?chain=solana`,
    },
    { text: '📈 Scan', url: `https://t.me/ttfbotbot?start=sol-${mint}` },
    {
      text: '📈 Chart',
      url: `https://t.me/ttfbotbot?start=solc-${mint}`,
    },
  ],
  [{ text: '🔄 Refresh', callback_data: `refreshManagePositions ${index}` }],
];

const noOpenPositionsKeyboard = () => [
  [{ text: 'Close', callback_data: 'close' }],
];

module.exports = {
  positionKeyboard,
  noOpenPositionsKeyboard,
};
