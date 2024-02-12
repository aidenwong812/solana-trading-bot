const { Connection, clusterApiUrl } = require('@solana/web3.js');

// const endpoint = clusterApiUrl(process.env.CLUSTER_ENDPOINT);
const endpoint =
  'https://tame-withered-tab.solana-mainnet.quiknode.pro/b47b262f16263a90edbb42ac229e8ea0d728e3e7/';
const connection = new Connection(endpoint, 'confirmed');

module.exports = connection;
