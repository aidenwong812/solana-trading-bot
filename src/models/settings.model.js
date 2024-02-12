const { DataTypes } = require('sequelize');
const sequelize = require('@/configs/database.js');

const Settings = sequelize.define(
  'Settings',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    announcements: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    minPosValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.001,
    },
    autoBuy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    autoBuyAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.1,
    },
    leftBuyAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
    },
    rightBuyAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 5.0,
    },
    leftSellAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 25,
    },
    rightSellAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 100,
    },
    buySlippage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 20,
    },
    sellSlippage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 20,
    },
  },
  {
    underscored: true,
    tableName: 'settings',
  }
);

module.exports = Settings;
