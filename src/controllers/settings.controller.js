const Settings = require('@/models/settings.model');
const { findStrategy } = require('./strategy.controller');

const findSettings = async (id) => {
  const settings = await Settings.findByPk(id.toString(), { raw: true });
  const strategies = await findStrategy(id.toString())
  strategies.sort((a, b) => a.percent - b.percent)
  return { ...settings, strategies: strategies }
};

const createSettings = async (id) => {
  try {
    await Settings.create({ id });
  } catch {
    return null;
  }
};

const updateSettings = async (id, params) => {
  await Settings.update(params, {
    where: {
      id,
    },
  });
  const settings = await findSettings(id);
  return settings;
};

module.exports = {
  findSettings,
  createSettings,
  updateSettings,
};
