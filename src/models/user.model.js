const { DataTypes } = require('sequelize');
const sequelize = require('@/configs/database.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    referrerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    underscored: true,
    tableName: 'users',
  }
);

module.exports = User;
