const { trim, roundPrice, convertToShort, formatNumber } = require('@/utils');

const buyTokenMsg = () => `
  Buy Token:

  <b>  </b>To buy a token enter a token address or name.
`;

const tokenMsg = ({
  name,
  symbol,
  mint,
  priceUsd,
  priceChange,
  mcap,
  walletBalance,
}) => {
  return `
    ${name} | <b>${symbol}</b> | <code>${mint}</code>

    Price: <b>$${roundPrice(priceUsd)}</b>
    5m: <b>${formatNumber(priceChange.m5)}%</b>, 1h: <b>${formatNumber(
    priceChange.h1
  )}%</b>, 6h: <b>${formatNumber(priceChange.h6)}%</b> 24h: <b>${formatNumber(
    priceChange.h24
  )}%</b>
    Market Cap: <b>$${convertToShort(mcap)}</b>

    Wallet Balance: <b>${walletBalance.toFixed(4)} SOL</b>
    To buy press one of the buttons below.
  `;
};

const noRouteMsg = ({ tokenName, tokenSymbol, mintAddress, walletBalance }) => `
  ${tokenName} | <b>${tokenSymbol}</b> | <code>${mintAddress}</code>

  5m: <b>NaN%</b>, 1h: <b>NaN%</b>, 6h: <b>NaN%</b>, 24h: <b>NaN%</b>
  Market Cap: <b>$N/A</b>

  WARNING: No route found. Strikebot instant swap is currently only available for -SOL pairs on Raydium AMM v4 and Orca CLMM. Please try again later.

  Wallet Balance: <b>${walletBalance} SOL</b>
  To buy press one of the buttons below.
`;

const tokenNotFoundMsg = (token) => `
  Token not found. Make sure address (${token}) is correct. You can enter a token address.
`;

const autoBuyFailedMsg = ({ amount, walletBalance }) => `
  Auto Buy amount (${amount.toFixed(
    4
  )} SOL) is greater than your wallet balance (${walletBalance.toFixed(
  4
)} SOL). Please disable Auto Buy or lower the amount.
`;

module.exports = {
  buyTokenMsg: () => trim(buyTokenMsg()),
  tokenMsg: (params) => trim(tokenMsg(params)),
  tokenNotFoundMsg: (params) => trim(tokenNotFoundMsg(params)),
  noRouteMsg: (params) => trim(noRouteMsg(params)),
  autoBuyFailedMsg: (params) => trim(autoBuyFailedMsg(params)),
};
