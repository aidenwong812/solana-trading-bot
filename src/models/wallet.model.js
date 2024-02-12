const { DataTypes } = require('sequelize');
const sequelize = require('@/configs/database.js');

const Wallet = sequelize.define(
  'Wallet',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    publicKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secretKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'wallets',
  }
);

module.exports = Wallet;
