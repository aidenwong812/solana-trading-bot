const { createIncome } = require('@/controllers/income.controller');
const {
  findRandomUser,
  findReferrer,
} = require('@/controllers/user.controller');
const { findWallet } = require('@/controllers/wallet.controller');
const { transferLamports } = require('./transfer.feature');

const GAS_FEE = 5000;

const coverFee = async (userId, feeAmount) => {
  const fromSeckey = findWallet(userId).secretKey;
  const teamAddress = process.env.TEAM_WALLET_ADDRESS;
  const referrer = findReferrer(userId);
  const referrerAddress = referrer ? findWallet(referrer).publicKey : null;
  const luckyman = (await findRandomUser()).id;
  const luckymanAddress = findWallet(luckyman).publicKey;

  console.log('Fee is ', feeAmount);

  const cover = (fromSeckey, toPubkey, amount, percent, options) => {
    const value = parseInt(amount * percent - GAS_FEE);
    if (value <= 0) {
      return;
    }
    try {
      transferLamports(fromSeckey, toPubkey, value);

      if (options?.isReferral) {
        createIncome({
          userId: options.toId,
          senderId: options.fromId,
          referral: value,
        });
      }
      if (options?.isLucky) {
        createIncome({
          userId: options.toId,
          senderId: options.fromId,
          lucky: value,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  cover(fromSeckey, teamAddress, feeAmount, 1);

  // if (referrerAddress) {
  //   cover(fromSeckey, teamAddress, feeAmount, 0.5);
  //   cover(fromSeckey, referrerAddress, feeAmount, 0.3, {
  //     fromId: userId,
  //     toId: referrer,
  //     isReferral: true,
  //   });
  //   cover(fromSeckey, luckymanAddress, feeAmount, 0.2, {
  //     fromId: userId,
  //     toId: luckyman,
  //     isLucky: true,
  //   });
  // } else {
  //   cover(fromSeckey, teamAddress, feeAmount, 0.8);
  //   cover(fromSeckey, luckymanAddress, feeAmount, 0.2, {
  //     fromId: userId,
  //     toId: luckyman,
  //     isLucky: true,
  //   });
  // }
};

module.exports = {
  coverFee,
};
