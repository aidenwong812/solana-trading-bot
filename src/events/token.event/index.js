const { createCopyTrade } = require('@/controllers/copy.controller');
const { findSettings } = require('@/controllers/settings.controller');
const { findWallet } = require('@/controllers/wallet.controller');
const {
  SettingsNotFoundError,
  WalletNotFoundError,
} = require('@/errors/common');
const { buyAmount } = require('@/events/buy.event');
const { sellPercent } = require('@/events/sell.event');
const { getPair } = require('@/services/dexscreener');
const { getBalance } = require('@/services/solana');
const { getTokenMetadata } = require('@/services/metaplex');
const { getTokenAccountsByOwner } = require('@/features/token.feature');
const { clearAllInterval, setIntervalID } = require('@/store');
const Wallet = require('@/models/wallet.model');
const {
  buyTokenMsg,
  tokenMsg,
  tokenNotFoundMsg,
  tokenNotFoundInWalletMsg,
  noRouteMsg,
  autoBuyFailedMsg,
  copyWalletMsg,
  invalidInputMsg,
  invalidWalletAddressMsg,
  copyTradeMsg,
} = require('./messages');
const { buyTokenKeyboard, tokenKeyboard } = require('./keyboards');

const TimeInterval = 30 * 1000;

const buyToken = (bot, msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, buyTokenMsg(), {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: buyTokenKeyboard(),
    },
  });
};

const processToken = async (bot, msg) => {
  const chatId = msg.chat.id;

  const settings = await findSettings(chatId);
  if (settings === null) {
    console.error(SettingsNotFoundError);
    return;
  }

  if (settings.autoBuy) {
    autoBuyToken(bot, msg, {
      mintAddress: msg.text,
      settings,
    });
  } else {
    showToken(bot, msg, {
      settings,
      mintAddress: msg.text,
      refresh: false,
    });
  }
};

const autoBuyToken = async (bot, msg, params) => {
  const chatId = msg.chat.id;

  const wallet = findWallet(chatId);
  if (wallet === null) {
    console.error(WalletNotFoundError);
    return;
  }

  const walletAddress = wallet.publicKey;
  const { mintAddress, settings } = params;

  try {
    await getTokenMetadata(mintAddress);
  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, tokenNotFoundMsg(mintAddress));
    return;
  }

  const walletBalance = await getBalance(walletAddress);

  if (settings.autoBuyAmount > walletBalance) {
    bot.sendMessage(
      chatId,
      autoBuyFailedMsg({ amount: settings.autoBuyAmount, walletBalance })
    );
    return;
  }

  buyAmount(bot, msg, {
    mintAddress,
    amount: settings.autoBuyAmount,
    isAuto: true,
  });
};

const autoSellToken = async (bot, msg, params) => {
  const chatId = msg.chat.id;

  const wallet = findWallet(chatId);
  if (wallet === null) {
    console.error(WalletNotFoundError);
    return;
  }

  const { mintAddress, settings } = params;

  try {
    await getTokenMetadata(mintAddress);
  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, tokenNotFoundMsg(mintAddress));
    return;
  }

  const tokens = (await getTokenAccountsByOwner(wallet.publicKey)).filter((token) => token.mint === mintAddress);
  if (tokens.length === 0) {
    bot.sendMessage(chatId, tokenNotFoundInWalletMsg(mintAddress));
    return;
  }

  sellPercent(bot, msg, {
    tokenInfo: tokens[0],
    percent: settings.autoSellAmount,
    isAuto: true,
  });
};

const showToken = async (bot, msg, params) => {
  await showTokenInterval(bot, msg, params);

  // clearAllInterval();

  // const id = setInterval(async () => {
  //   await showTokenInterval(bot, msg, { ...params, refresh: true });
  // }, TimeInterval)

  // setIntervalID({
  //   start: null,
  //   managePostition: null,
  //   token: id,
  // })
};

const showTokenInterval = async (bot, msg, params) => {
  const chatId = msg.chat.id;
  const { mintAddress, refresh } = params;

  const settings = params.settings || (await findSettings(chatId));
  if (settings === null) {
    console.error(SettingsNotFoundError);
    return;
  }

  const wallet = findWallet(chatId);
  if (wallet === null) {
    console.error(WalletNotFoundError);
    return;
  }

  const { message, keyboard } = await showTokenInterval.getMessage({
    walletAddress: wallet.publicKey,
    mintAddress,
    settings,
  });

  if (refresh === false) {
    bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
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
        reply_markup: {
          inline_keyboard: keyboard,
        },
      })
      .catch(() => { });
  }
}

showTokenInterval.getMessage = async ({ walletAddress, mintAddress, settings }) => {
  let metadata, walletBalance;
  let priceUsd, priceChange;
  let liquidity, pooledSol;

  try {
    metadata = await getTokenMetadata(mintAddress);
  } catch (e) {
    console.error(e);
    return {
      message: tokenNotFoundMsg(mintAddress),
      keyboard: [],
    };
  }

  try {
    walletBalance = await getBalance(walletAddress);
  } catch (e) {
    console.error(e);
    return {
      message: error.message,
      keyboard: [],
    };
  }

  try {
    const pair = await getPair(mintAddress);
    priceUsd = parseFloat(pair.priceUsd);
    priceChange = pair.priceChange;
    liquidity = pair.liquidity.usd / 2;
    pooledSol = pair.liquidity.quote
  } catch (e) {
    console.error(e);
    return {
      message: noRouteMsg({
        tokenName: metadata.name,
        tokenSymbol: metadata.symbol,
        mintAddress,
        walletBalance,
      }),
      keyboard: tokenKeyboard({ mintAddress, settings }),
    };
  }

  return {
    message: tokenMsg({
      mint: mintAddress,
      name: metadata.name,
      symbol: metadata.symbol,
      priceUsd,
      priceChange,
      mcap:
        (priceUsd * metadata.mint.supply.basisPoints.toString()) /
        10 ** metadata.mint.decimals,
      liquidity,
      pooledSol,
      walletBalance,
    }),
    keyboard: tokenKeyboard({ mintAddress, settings }),
  };
};

const copyTrade = (bot, msg) => {
  const chatId = msg.chat.id;
  bot
    .sendMessage(chatId, copyWalletMsg(), {
      parse_mode: 'HTML',
      reply_markup: {
        force_reply: true,
      },
    })
    .then(({ message_id }) => {
      bot.onReplyToMessage(chatId, message_id, async (reply) => {
        const text = reply.text.split(' ');
        const copyWalletAddress = text[0];
        const amount = parseFloat(text[1]);
        const wallets = await Wallet.findAll({
          where: {
            publicKey: copyWalletAddress,
          },
          raw: true,
        })

        if (text.length < 2) {
          bot.sendMessage(chatId, invalidInputMsg());
          return;
        }
        if (amount < 0) {
          bot.sendMessage(chatId, invalidInputMsg());
          return;
        }
        if (wallets.length === 0) {
          bot.sendMessage(chatId, invalidWalletAddressMsg());
          return;
        }

        await createCopyTrade({ copyWalletAddress, amount, userId: chatId });

        bot.sendMessage(chatId, copyTradeMsg());
      });
    })
}

module.exports = {
  buyToken,
  processToken,
  showToken,
  autoBuyToken,
  copyTrade,
};
