const { Sequelize } = require('sequelize');
const User = require('@/models/user.model');
const store = require('@/store');
const { decrypt } = require('@/utils');

const findAllUsers = async () => {
  const users = await User.findAll({ raw: true });
  return users;
};

const createUser = async (id, code = null) => {
  try {
    const referrerId = code && decrypt(code);

    const user = await User.create({
      id,
      referrerId,
    });

    store.setUser(user);
    store.setReferrer(user);

    return user;
  } catch {
    return null;
  }
};

const findUser = (id) => {
  return store.getUser(id);
};

const findRandomUser = async () => {
  const user = await User.findOne({
    order: Sequelize.literal('random()'),
    limit: 1,
    raw: true,
  });
  return user;
};

const findReferrer = (id) => {
  return store.getReferrer(id);
};

const getNumberOfReferrals = async (id) => {
  const users = await User.findAll({ where: { referrerId: id.toString() } });
  return users.length;
};

module.exports = {
  findAllUsers,
  createUser,
  findUser,
  findRandomUser,
  findReferrer,
  getNumberOfReferrals,
};
