const Income = require('@/models/income.model');
const store = require('@/store');

const findAllIncomes = async () => {
  const incomes = await Income.findAll({ raw: true });
  return incomes;
};

const createIncome = async ({ userId, senderId, referral, lucky }) => {
  const income = await Income.create({
    userId,
    senderId,
    referral,
    lucky,
  });

  return income;
};

const getLifeTimeIncome = async (id) => {
  const incomes = await Income.findAll({
    where: {
      userId: id.toString(),
    },
    raw: true,
  });

  return incomes.reduce(
    (total, current) => total + (current.referral || 0) + (current.lucky || 0),
    0
  );
};

module.exports = {
  findAllIncomes,
  createIncome,
  getLifeTimeIncome,
};
