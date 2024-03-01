const { prisma } = require('../configs/database');
const { findStrategy } = require('./strategy.controller');

const findSettings = async (id) => {
  const settings = await prisma.settings.findUnique({
    where: {
      id: id.toString(),
    },
  });
  const strategies = await findStrategy(id.toString());
  strategies.sort((a, b) => a.percent - b.percent);
  return { ...settings, strategies: strategies };
};

const createSettings = async (id) => {
  try {
    await prisma.settings.create({
      data: {
        id: id.toString(),
      },
    });
  } catch(error) {
    console.error(error.message)
    return null;
  }
};

const updateSettings = async (id, params) => {
  await prisma.settings.update({
    where: {
      id: id.toString(),
    },
    data: params,
  });
  const settings = await findSettings(id);
  return settings;
};

module.exports = {
  findSettings,
  createSettings,
  updateSettings,
};
