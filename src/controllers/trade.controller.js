const { Op } = require('sequelize');
const Trade = require('@/models/trade.model');

const createTrade = async (params) => {
  const trade = await Trade.create(params);
  return trade;
};

const getTradesData = async (userId, mintAddress) => {
  const trades = await Trade.findAll({
    where: {
      userId: userId.toString(),
      [Op.or]: [{ inputMint: mintAddress }, { outputMint: mintAddress }],
    },
    attributes: ['inputMint', 'inAmount', 'outAmount'],
    raw: true,
  });

  let baseAmount = 0;
  let quoteAmount = 0;
  let initial = 0;

  trades.forEach((trade) => {
    if (trade.inputMint === 'So11111111111111111111111111111111111111112') {
      initial += trade.inAmount;
      baseAmount += trade.inAmount;
      quoteAmount += trade.outAmount;
    }
    if (trade.inputMint === mintAddress) {
      initial -= trade.outAmount;
      quoteAmount -= trade.inAmount;
      baseAmount -= trade.outAmount;
    }
  });

  return { initial, baseAmount, quoteAmount };
};

module.exports = {
  createTrade,
  getTradesData,
};
