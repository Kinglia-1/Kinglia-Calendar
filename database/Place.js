const mongoose = require('mongoose');
const db = require('../config/mongo_config.js');
mongoose.Promise = global.Promise;

let PlaceSchema = new mongoose.Schema({
  id: Number,
  nightly_fee: Number,
  cleaning_fee: Number,
  occupancy_tax_rate: Number,
  avg_rating: Number,
  reviews: Number,
  city: String,
  max_capacity: Number
  });

let Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;

