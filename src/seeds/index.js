const sequelize = require('@/configs/database');
const User = require('@/models/user.model');
const Wallet = require('@/models/wallet.model');
const Settings = require('@/models/settings.model');
const Income = require('@/models/income.model');
const Trade = require('@/models/trade.model');

sequelize.sync({ force: true });
