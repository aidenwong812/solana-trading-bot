const { trim } = require('@/utils');

const settingsMsg = () => `
  <b>Settings:</b>
    
  <b>GENERAL SETTINGS</b>
  <b>Minimum Position Value:</b> Minimum position value to show in portfolio. Will hide tokens below this threshhold. Tap to edit.

  <b>AUTO BUY</b>
  Immediately buy when pasting token address. Tap to toggle.

  <b>BUTTONS CONFIG</b>
  Customize your buy and sell buttons for buy token and manage position. Tap to edit.

  <b>SLIPPAGE CONFIG</b>
  Customize your slippage settings for buys and sells. Tap to edit.

  <b>TRANSACTION PRIORITY</b>
  Increase your Transaction Priority to improve transaction speed. Select preset or tap to edit.
`;

const replyMinPosValueMsg = () => `
  Reply with your new minimum $ value for positions to be displayed. Example: 0.01
`;

const minPosValueMsg = (minPosValue) => `
  Minimum Position Value set to $${minPosValue}.
`;

const autoBuyMsg = (value) => `
  Auto Buy ${value ? 'enabled' : 'disabled'}.
`;

const autoSellMsg = (value) => `
  Auto Sell ${value ? 'enabled' : 'disabled'}.
`;

const replyAutoBuyAmountMsg = () => `
  Reply with your new Auto Buy Amount in SOL. Example: 0.5
`;

const replyAutoSellAmountMsg = () => `
  Reply with your new Auto Sell Amount in %. Example: 50
`;

const autoBuyAmountMsg = (value) => `
  Auto Buy Amount set to ${value} SOL.
`;

const autoSellAmountMsg = (value) => `
  Auto Sell Amount set to ${value} %.
`;

const replyLeftBuyAmountMsg = () => `
  Reply with your new setting for the left Buy Button in SOL. Example: 0.5
`;

const leftBuyAmountMsg = (value) => `
  Left Buy Button set to ${value} SOL.
`;

const replyRightBuyAmountMsg = () => `
  Reply with your new setting for the right Buy Button in SOL. Example: 1.5
`;

const rightBuyAmountMsg = (value) => `
  Right Buy Button set to ${value} SOL.
`;

const replyLeftSellAmountMsg = () => `
  Reply with your new setting for the left Sell Button in % (0 - 100%). Example: 25
`;

const leftSellAmountMsg = (value) => `
  Left Sell Button set to ${value}%.
`;

const replyRightSellAmountMsg = () => `
  Reply with your new setting for the right Sell Button in % (0 - 100%). Example: 25
`;

const rightSellAmountMsg = (value) => `
  Right Sell Button set to ${value}%.
`;

const replyBuySlippageMsg = () => `
  Reply with your new slippage setting for buys in % (0.00 - 50.00%). Example: 5.5
`;

const buySlippageMsg = (value) => `
  Buy Slippage set to ${value}%.
`;

const replySellSlippageMsg = () => `
  Reply with your new slippage setting for sells in % (0.00 - 50.00%). Example: 5.5
`;

const sellSlippageMsg = (value) => `
  Sell Slippage set to ${value}%.
`;

const replyAutoBuySlippageMsg = () => `
  Reply with your new slippage setting for auto buys in % (0.00 - 50.00%). Example: 5.5
`;

const autoBuySlippageMsg = (value) => `
  Auto Buy Slippage set to ${value}%.
`;

const replyAutoSellSlippageMsg = () => `
  Reply with your new slippage setting for auto sells in % (0.00 - 50.00%). Example: 5.5
`;

const autoSellSlippageMsg = (value) => `
  Auto Sell Slippage set to ${value}%.
`;

const replyGasFeeMsg = () => `
  Reply with your new gas fee setting in SOL. Example: 0.0005
`;

const gasFeeMsg = (value) => `
  Gas fee set to ${value} SOL.
`;

const invalidNumberMsg = () => `
  Invalid number entered. Please try again. Example: 0.5
`;

const numberLimitMsg = () => `
  Number can not be under 0 or over 100. Please try again. Example: 50
`;

module.exports = {
  settingsMsg: () => trim(settingsMsg()),
  replyMinPosValueMsg: () => trim(replyMinPosValueMsg()),
  minPosValueMsg: (params) => trim(minPosValueMsg(params)),
  autoBuyMsg: (params) => trim(autoBuyMsg(params)),
  autoSellMsg: (params) => trim(autoSellMsg(params)),
  replyAutoBuyAmountMsg: () => trim(replyAutoBuyAmountMsg()),
  replyAutoSellAmountMsg: () => trim(replyAutoSellAmountMsg()),
  autoBuyAmountMsg: (params) => trim(autoBuyAmountMsg(params)),
  autoSellAmountMsg: (params) => trim(autoSellAmountMsg(params)),
  replyLeftBuyAmountMsg: () => trim(replyLeftBuyAmountMsg()),
  leftBuyAmountMsg: (params) => trim(leftBuyAmountMsg(params)),
  replyRightBuyAmountMsg: () => trim(replyRightBuyAmountMsg()),
  rightBuyAmountMsg: (params) => trim(rightBuyAmountMsg(params)),
  replyLeftSellAmountMsg: () => trim(replyLeftSellAmountMsg()),
  leftSellAmountMsg: (params) => trim(leftSellAmountMsg(params)),
  replyRightSellAmountMsg: () => trim(replyRightSellAmountMsg()),
  rightSellAmountMsg: (params) => trim(rightSellAmountMsg(params)),
  replyBuySlippageMsg: () => trim(replyBuySlippageMsg()),
  buySlippageMsg: (params) => trim(buySlippageMsg(params)),
  replySellSlippageMsg: () => trim(replySellSlippageMsg()),
  sellSlippageMsg: (params) => trim(sellSlippageMsg(params)),
  replyAutoBuySlippageMsg: () => trim(replyAutoBuySlippageMsg()),
  autoBuySlippageMsg: (params) => trim(autoBuySlippageMsg(params)),
  replyAutoSellSlippageMsg: () => trim(replyAutoSellSlippageMsg()),
  autoSellSlippageMsg: (params) => trim(autoSellSlippageMsg(params)),
  replyGasFeeMsg: () => trim(replyGasFeeMsg()),
  gasFeeMsg: (params) => trim(gasFeeMsg(params)),
  invalidNumberMsg: () => trim(invalidNumberMsg()),
  numberLimitMsg: () => trim(numberLimitMsg()),
};
