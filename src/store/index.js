const store = {
  users: {},
  wallets: {},
  referrers: {},
  numberOfReferrals: {},
  lifeTimeIncomes: {},

  getUser: function (id) {
    return this.users[id] || null;
  },

  setUser: function (user) {
    const { id } = user;
    this.users[id] = user;
  },

  getWallet: function (id) {
    return this.wallets[id] || null;
  },

  setWallet: function (wallet) {
    const { id } = wallet;
    this.wallets[id] = wallet;
  },

  getReferrer: function (id) {
    return this.referrers[id] || null;
  },

  setReferrer: function (user) {
    const { id, referrerId } = user;
    if (referrerId) {
      this.referrers[referrerId] = id;
    }
  },
};

module.exports = store;
