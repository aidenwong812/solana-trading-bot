const replyAmountMsg = () => `
  Reply with the amount you wish to sell (0 - 100%):
`;

const invalidAmountMsg = () => `Invalid amount. Press button and try again.`;

module.exports = {
  replyAmountMsg: () => replyAmountMsg(),
  invalidAmountMsg: () => invalidAmountMsg(),
};
