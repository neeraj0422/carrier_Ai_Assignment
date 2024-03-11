const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const User = require('./models/user'); // Assuming the user.js file is in the same folder

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define a route for user signup (you may need to update this route to store users in a database)
app.post('/signup', async (req, res) => {
  const userData = req.body;

  // Create a new User instance and save it to the database
  const newUser = new User(userData);
  try {
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Define a route for user preferences
app.post('/save-preferences', async (req, res) => {
  const { tickers } = req.body;
  const user = await User.findById(req.user._id); // Assuming you have user authentication set up

  user.tickers = tickers.split(',').map(ticker => ticker.trim());
  await user.save();

  res.redirect('/preferences');
});

// Define a route to display user preferences
app.get('/my-preferences', async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Assuming you have user authentication set up
    res.render('my-preferences', { tickers: user.tickers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Render the preferences page
app.get('/preferences', (req, res) => {
  res.render('preferences');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
