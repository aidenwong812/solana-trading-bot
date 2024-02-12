const { SettingsNotFoundError } = require('@/errors/common');
const {
  findSettings,
  updateSettings,
} = require('@/controllers/settings.controller');
const {
  settingsMsg,
  accounementsMsg,
  replyMinPosValueMsg,
  minPosValueMsg,
  autoBuyMsg,
  replyAutoBuyAmountMsg,
  autoBuyAmountMsg,
  replyLeftBuyAmountMsg,
  leftBuyAmountMsg,
  replyRightBuyAmountMsg,
  rightBuyAmountMsg,
  replyLeftSellAmountMsg,
  leftSellAmountMsg,
  replyRightSellAmountMsg,
  rightSellAmountMsg,
  replyBuySlippageMsg,
  buySlippageMsg,
  replySellSlippageMsg,
  sellSlippageMsg,
  invalidNumberMsg,
  numberLimitMsg,
} = require('./messages');
const { settingsKeyboard } = require('./keyboards');

const showSettings = async (bot, msg) => {
  const chatId = msg.chat.id;

  const settings = await findSettings(chatId);
  if (settings === null) {
    console.error(SettingsNotFoundError);
    return;
  }

  bot.sendMessage(chatId, settingsMsg(), {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: settingsKeyboard(settings),
    },
  });
};

const toggleSetting = async (bot, msg, params) => {
  const chatId = msg.chat.id;
  const { name, value } = params;
  const settings = await updateSettings(chatId, { [name]: value });

  bot
    .editMessageText(settingsMsg(), {
      chat_id: chatId,
      message_id: msg.message_id,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: settingsKeyboard(settings),
      },
    })
    .then(() => {
      switch (name) {
        case 'announcements':
          bot.sendMessage(chatId, accounementsMsg(settings.announcements));
          break;
        case 'autoBuy':
          bot.sendMessage(chatId, autoBuyMsg(settings.autoBuy));
          break;
      }
    })
    .catch(() => {});
};

const editSetting = async (bot, msg, params) => {
  const chatId = msg.chat.id;
  const { name } = params;
  let message;

  switch (name) {
    case 'minPosValue':
      message = replyMinPosValueMsg();
      break;
    case 'autoBuyAmount':
      message = replyAutoBuyAmountMsg();
      break;
    case 'leftBuyAmount':
      message = replyLeftBuyAmountMsg();
      break;
    case 'rightBuyAmount':
      message = replyRightBuyAmountMsg();
      break;
    case 'leftSellAmount':
      message = replyLeftSellAmountMsg();
      break;
    case 'rightSellAmount':
      message = replyRightSellAmountMsg();
      break;
    case 'buySlippage':
      message = replyBuySlippageMsg();
      break;
    case 'sellSlippage':
      message = replySellSlippageMsg();
      break;
    default:
      message = '';
  }

  bot
    .sendMessage(chatId, message, {
      reply_markup: {
        force_reply: true,
      },
    })
    .then(({ message_id }) => {
      bot.onReplyToMessage(chatId, message_id, async (reply) => {
        const value = parseFloat(reply.text);

        switch (name) {
          case 'leftSellAmount':
          case 'rightSellAmount':
          case 'buySlippage':
          case 'sellSlippage':
            if (value < 0 || value > 100) {
              bot.sendMessage(chatId, numberLimitMsg());
              return;
            }
          case 'minPosValue':
          case 'autoBuyAmount':
          case 'leftBuyAmount':
          case 'rightBuyAmount':
            if (isNaN(value)) {
              bot.sendMessage(chatId, invalidNumberMsg());
              return;
            }
        }

        const settings = await updateSettings(chatId, { [name]: value });

        bot.editMessageText(settingsMsg(settings), {
          chat_id: chatId,
          message_id: msg.message_id,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: settingsKeyboard(settings),
          },
        });

        switch (name) {
          case 'minPosValue':
            bot.sendMessage(chatId, minPosValueMsg(value));
            break;
          case 'autoBuyAmount':
            bot.sendMessage(chatId, autoBuyAmountMsg(value));
            break;
          case 'leftBuyAmount':
            bot.sendMessage(chatId, leftBuyAmountMsg(value));
            break;
          case 'rightBuyAmount':
            bot.sendMessage(chatId, rightBuyAmountMsg(value));
            break;
          case 'leftSellAmount':
            bot.sendMessage(chatId, leftSellAmountMsg(value));
            break;
          case 'rightSellAmount':
            bot.sendMessage(chatId, rightSellAmountMsg(value));
            break;
          case 'buySlippage':
            bot.sendMessage(chatId, buySlippageMsg(value));
            break;
          case 'sellSlippage':
            bot.sendMessage(chatId, sellSlippageMsg(value));
            break;
          default:
        }
      });
    });
};

module.exports = {
  showSettings,
  toggleSetting,
  editSetting,
};
