const { DataTypes } = require('sequelize');
const sequelize = require('@/configs/database.js');

const CopyTrade = sequelize.define(
  'CopyTrade',
  {
    copyWalletAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    underscored: true,
    tableName: 'copy_trade',
  }
);

module.exports = CopyTrade;
