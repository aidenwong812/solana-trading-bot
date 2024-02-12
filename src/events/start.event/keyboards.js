const startKeyboard = () => [
  [
    { text: 'Buy', callback_data: 'buyToken' },
    { text: 'Sell & Manage', callback_data: 'managePositions' },
  ],
  [
    { text: 'Wallet', callback_data: 'showWallet' },
    { text: 'Settings', callback_data: 'showSettings' },
  ],
  [
    { text: 'Refer Friends', callback_data: 'showReferrals' },
    { text: 'Refresh', callback_data: 'refreshStart' },
  ],
];

module.exports = {
  startKeyboard,
};
