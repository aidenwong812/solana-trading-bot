const { trim } = require('@/utils');

const referralsMsg = ({ code, referrals, income }) => `
  <b>Referrals</b>:

  Your reflink: https://t.me/strike_solana_bot?start=ref_${code}

  Referrals: <b>${referrals}</b>
  Lifetime SOL earned: <b>${income} SOL</b>

  Rewards are updated at least every 24 hours and rewards are automatically deposited to your STRIKE balance.

  Refer your friends and earn <b>20</b>% of their fees!
`;

module.exports = {
  referralsMsg: (params) => trim(referralsMsg(params)),
};
