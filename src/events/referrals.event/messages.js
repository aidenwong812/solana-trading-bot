const { trim } = require('@/utils');

const referralsMsg = ({ code, referrals, income }) => `
  <b>REFERRALS:</b>

  🔗 Your reflink: <pre>https://t.me/orcagun_dev_bot?start=ref_${code}</pre>

  👥 Referrals: <b>${referrals}</b>
  💰 Lifetime SOL earned: <b>${income} SOL</b>

  <i>🔥 Rewards are updated at least every 24 hours and rewards are automatically deposited to your Tonk Sniper balance.

  Refer your friends and earn <b>30</b>% of their fees!</i>
`;

module.exports = {
  referralsMsg: (params) => trim(referralsMsg(params)),
};
