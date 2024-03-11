const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://neeraj13031998:734Hw3bDvTJLNAqr@cluster0.0njduhw.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
