const mongoose = require('mongoose');
const priceSchema = new mongoose.Schema({
    inr:Number
});
const Price = mongoose.model('Price', priceSchema);
  module.exports = Price