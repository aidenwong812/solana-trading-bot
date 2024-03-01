const { prisma } = require('../configs/database');

const findCopyTrade = async (address) => {
  const copyTrades = await prisma.copyTrade.findAll({
    where: {
      copyWalletAddress: address.toString(),
    },
    raw: true,
  })
  return copyTrades
};

const createCopyTrade = async (params) => {
  try {
    await prisma.copyTrade.create({
      data: params
    });
  } catch (e) {
    return null;
  }
};

const updateCopyTrade = async (id, params) => {
  await prisma.copyTrade.update({
    where: {
      id,
    },
    data: params,
  });
  const copyTrades = await findCopyTrade(id);
  return copyTrades;
};

module.exports = {
  findCopyTrade,
  createCopyTrade,
  updateCopyTrade,
};
