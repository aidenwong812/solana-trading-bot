const { trim } = require('@/utils');

const helpMsg = () => `
  <b>HELP:</b>

  <b>Which tokens can I trade?</b>
  Any SPL token that is a Sol pair, on Jupiter. Jupiter will pick up non sol pairs within around 15 minutes

  <b>How can I see how much money I've made from referrals?</b>
  Check the referrals button or type /referrals to see your payment in Tonk Sniper !

  <b>I want to create a new wallet on Tonk Sniper.</b>
  Type /wallet, and you will be able to configure your new wallets.

  <b>Is Tonk Sniper free? How much do i pay for transactions?</b>
  Tonk Sniper bot is completely free! We charge 1% on transactions, and keep the bot free so that anyone can use it.
`;

module.exports = {
  helpMsg: (params) => trim(helpMsg(params)),
};
