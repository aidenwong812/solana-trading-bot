const Strategy = require('@/models/strategy.model');

const findStrategy = async (id) => {
  const strategies = await Strategy.findAll({
    where: {
      userId: id.toString(),
    },
    attributes: ['id', 'percent', 'amount'],
    raw: true,
  })
  return strategies
};

const createStrategy = async (params) => {
  try {
    await Strategy.create(params);
  } catch {
    return null;
  }
};

const updateStrategy = async (id, params) => {
  await Strategy.update(params, {
    where: {
      id,
    },
  });
  const strategies = await findStrategy(id);
  return strategies;
};

module.exports = {
  findStrategy,
  createStrategy,
  updateStrategy,
};
