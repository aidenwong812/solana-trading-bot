const startCommand = {
  command: 'start',
  description: 'view trades and open main menu',
};

const walletCommand = {
  command: 'wallet',
  description: 'view wallet and open wallet menu',
};

const helpCommand = {
  command: 'help',
  description: 'tips and frequently asked questions',
};

const commands = [startCommand, walletCommand, helpCommand];

module.exports = commands;
