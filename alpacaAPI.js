const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpacaAPI = new Alpaca({
  keyId: 'CKYRI6RW7U151D6PFU38',
  secretKey: 'Y998u26hgxUMPIfDmb8dYhV0mTJZ0lO0RbTInW1wV',
  paper: true, // Set to true for paper trading, false for live trading
});

// Get account information
async function getAccountInfo() {
  try {
    const account = await alpacaAPI.getAccount();
    console.log('Account:', account);
  } catch (err) {
    console.error('Error retrieving account information:', err);
  }
}

// Get open positions
async function getPositions() {
  try {
    const positions = await alpacaAPI.getPositions();
    console.log('Positions:', positions);
  } catch (err) {
    console.error('Error retrieving positions:', err);
  }
}

// Call the functions
getAccountInfo();
getPositions();