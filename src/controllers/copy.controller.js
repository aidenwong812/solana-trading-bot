const CopyTrade = require('@/models/copy.model');

const findCopyTrade = async (address) => {
  const copyTrades = await CopyTrade.findAll({
    where: {
      copyWalletAddress: address.toString(),
    },
    raw: true,
  })
  return copyTrades
};

const createCopyTrade = async (params) => {
  try {
    await CopyTrade.create(params);
  } catch (e) {
    return null;
  }
};

const updateCopyTrade = async (id, params) => {
  await CopyTrade.update(params, {
    where: {
      id,
    },
  });
  const copyTrades = await findCopyTrade(id);
  return copyTrades;
};

module.exports = {
  findCopyTrade,
  createCopyTrade,
  updateCopyTrade,
};
