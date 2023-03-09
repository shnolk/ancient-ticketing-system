const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  barcode: {
    type: String,
    unique: true,
    required: true
  },
  scanCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
