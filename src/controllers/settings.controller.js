const Settings = require('@/models/settings.model');

const findSettings = async (id) => {
  const settings = await Settings.findByPk(id.toString(), { raw: true });
  return settings;
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
