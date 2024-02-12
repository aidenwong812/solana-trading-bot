const { LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { createUser, findUser } = require('@/controllers/user.controller');
const { createWallet, findWallet } = require('@/controllers/wallet.controller');
const { createSettings } = require('@/controllers/settings.controller');
const { getTradesData } = require('@/controllers/trade.controller');
const { WalletNotFoundError } = require('@/errors/common');
const { getTokenAccountsByOwner } = require('@/features/token.feature');
const { getBalance } = require('@/services/solana');
const { welcomeMsg, positionsMsg } = require('./messages');
const { startKeyboard } = require('./keyboards');

const start = async (bot, msg, params) => {
  const chatId = msg.chat.id;
  const { code, refresh } = params;

  if (findUser(chatId) === null) {
    await createUser(chatId, code);
    await createWallet(chatId);
    await createSettings(chatId);
  }

  const wallet = findWallet(chatId);
  if (wallet === null) {
    console.error(WalletNotFoundError);
    return;
  }

  const { message, keyboard } = await start.getMessage(
    chatId,
    wallet.publicKey
  );

  if (refresh === false) {
    bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } else {
    bot
      .editMessageText(message, {
        chat_id: chatId,
        message_id: msg.message_id,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: keyboard,
        },
      })
      .catch(() => {});
  }
};

start.getMessage = async (userId, walletAddress) => {
  const walletBalance = await getBalance(walletAddress);
  const tokenAccounts = await getTokenAccountsByOwner(walletAddress);

  if (tokenAccounts.length === 0) {
    return {
      message: welcomeMsg({ walletAddress, walletBalance }),
      keyboard: startKeyboard(),
    };
  }

  for (i = tokenAccounts.length - 1; i >= 0; i--) {
    const { mint, decimals, priceNative } = tokenAccounts[i];
    const { initial, baseAmount, quoteAmount } = await getTradesData(
      userId,
      mint
    );

    const profitSol =
      (quoteAmount / 10 ** decimals) * priceNative -
      baseAmount / LAMPORTS_PER_SOL;
    const profitPercent = (profitSol * 100.0) / (initial / LAMPORTS_PER_SOL);

    tokenAccounts[i].profitSol = profitSol;
    tokenAccounts[i].profitPercent = profitPercent;
  }

  return {
    message: positionsMsg({ tokenAccounts, walletBalance }),
    keyboard: startKeyboard(),
  };
};

module.exports = {
  start,
};
