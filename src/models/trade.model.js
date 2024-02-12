const { DataTypes } = require('sequelize');
const sequelize = require('@/configs/database.js');

const Trade = sequelize.define(
  'Trade',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inputMint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    outputMint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    outAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'trades',
  }
);

module.exports = Trade;
