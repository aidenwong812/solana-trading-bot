const { DataTypes } = require('sequelize');
const sequelize = require('@/configs/database.js');

const Income = sequelize.define(
  'Income',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referral: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lucky: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    underscored: true,
    tableName: 'incomes',
  }
);

module.exports = Income;
