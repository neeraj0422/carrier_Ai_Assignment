const express = require('express');
const path = require('path');
const User = require('./models/user');
require('dotenv').config();
const connectDB = require('./db/connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const cors = require('cors');
const authRouter = require('../careerAi/auth/auth');
const Position = require('./models/position');
// Import bcrypt module for password hashing

// Connect to the MongoDB database
connectDB();

// Import the verifyToken middleware
const verifyToken = require('./auth/middleware');

// Import the auth routes
const authRoutes = require('./auth/auth');

// Create an Express app
const app = express();

// Set the app's port
const port = process.env.PORT || 3001;

// CORS Middleware for Development (modify for production)
app.use(cors()); // Enable CORS for all origins during development

// Middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Preferences route to save user preferences
app.post('/api/preferences', async (req, res) => {
  try {
    // Extract tickers data from request body
    const { tickers } = req.body;

    // Retrieve the user ID from request headers or wherever it's stored
    const userId = req.headers['user-id']; // Example: Assuming user ID is stored in headers

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Save the preferences to the user document
    user.tickers = tickers.split(',').map(ticker => ticker.trim()); // Assuming tickers are comma-separated
    await user.save();

    res.status(200).json({ success: true, message: 'Preferences saved successfully' });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// EJS view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Auth routes
app.use('/api/auth', authRoutes);

// Signup route
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, brokerApiKey, brokerApiSecret } = req.body;
    console.log("req body " + req.body)
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      brokerApiKey,
      brokerApiSecret,
    });

    // Save the new user to the database
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Preferences route
app.get('/preferences', (req, res) => {
  res.render('preferences');
});

// Protected route to get user's preferences
app.get('/my-preferences', verifyToken, async (req, res) => {
  console.log('Request user:', req.user);
  try {
    const user = await User.findById(req.user.id).populate('tickers');
    console.log('User preferences:', user.tickers);
    res.render('my-preferences', { tickers: user.tickers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Webhook endpoint for TradingView alerts
app.post('/tradingview-webhook', async (req, res) => {
  // Use the crypto module to validate the webhook signature
  const signature = req.headers['x-tv-webhook-signature'];
  const hmac = crypto.createHmac('sha256', process.env.TRADINGVIEW_WEBHOOK_SECRET);
  hmac.update(JSON.stringify(req.body));
  const calculatedSignature = hmac.digest('hex');
  if (signature !== calculatedSignature) {
    console.warn('Invalid webhook signature');
    return res.status(401).send('Unauthorized');
  }

  const alertData = req.body;
  // Process the alert data, extract the necessary information, and execute trades based on the received signals
  console.log('Received alert data:', alertData);
  res.status(200).send('OK');
});

const fetchAccountInfo = async () => {
  // Simulate fetching account information from a database or external API
  return {
    accountNumber: '123456789',
    balance: 5000,
    currency: 'USD'
  };
};

// Define the fetchPositions function
const fetchPositions = async () => {
  try {
    // Fetch positions from the database or external API
    const positions = await Position.find(); // Example using Mongoose to fetch positions from MongoDB
    return positions;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw error; // Rethrow the error to handle it in the route handler
  }
};
// Define route to fetch account information
app.get('/account-info', async (req, res) => {
  try {
    // Fetch account information using the fetchAccountInfo function
    const accountInfo = await fetchAccountInfo();
    res.json(accountInfo);
  } catch (error) {
    console.error('Error fetching account information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to fetch positions
app.get('/positions', async (req, res) => {
  try {
    // Fetch positions from your database or external API
    const positions = await fetchPositions(); // Implement this function
    res.json(positions);
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Assume this is a function to fetch signals from a database or external API
const fetchSignals = async () => {
  // Implement the logic to fetch signals here
  // For demonstration purposes, let's return some mock data
  return [
    { symbol: 'AAPL', action: 'Buy' },
    { symbol: 'GOOG', action: 'Sell' },
    { symbol: 'MSFT', action: 'Hold' }
  ];
};

// Define route to fetch signals
// Define route to fetch signals
app.get('/signals', async (req, res) => {
  try {
    // Fetch signals using the fetchSignals function
    const signals = await fetchSignals();
    res.json(signals);
  } catch (error) {
    console.error('Error fetching signals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
