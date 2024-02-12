const bs58 = require('bs58');
const Wallet = require('@/models/wallet.model');
const store = require('@/store');
const { Keypair } = require('@solana/web3.js');

const findAllWallets = async () => {
  const wallets = await Wallet.findAll({ raw: true });
  return wallets;
};

const createWallet = async (id) => {
  try {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toBase58();
    const secretKey = bs58.encode(keypair.secretKey);
    const wallet = await Wallet.create({
      id,
      publicKey,
      secretKey,
    });

    store.setWallet(wallet);

    return wallet;
  } catch {
    return null;
  }
};

const findWallet = (id) => {
  return store.getWallet(id);
};

const updateWallet = async (id) => {
  const keypair = Keypair.generate();
  const wallet = {
    id,
    publicKey: keypair.publicKey.toBase58(),
    secretKey: bs58.encode(keypair.secretKey),
  };

  await Wallet.update(
    {
      publicKey: wallet.publicKey,
      secretKey: wallet.secretKey,
    },
    {
      where: {
        id: wallet.id,
      },
    }
  );

  store.setWallet(wallet);

  return wallet;
};

module.exports = {
  findAllWallets,
  createWallet,
  findWallet,
  updateWallet,
};
