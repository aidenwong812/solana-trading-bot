const { DataTypes } = require('sequelize');
const sequelize = require('@/configs/database.js');

const Strategy = sequelize.define(
  'Strategy',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'strategies',
  }
);

module.exports = Strategy;
