const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  ordername: { type: String, required: true },
  description: { type: String}
});

const Order = mongoose.model('Item', orderSchema);

module.exports = Order;