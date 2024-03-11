// position.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const positionSchema = new Schema({
  // Define your schema fields here
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
