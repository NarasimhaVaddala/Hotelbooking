// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Reference to the Room model
    required: true,
  },
  userId: {
    type: String, // You might want to use ObjectId if you're using MongoDB for users
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  paymentDetails: {
    type: String, // You can change this to a more complex structure if needed
    required: true,
  },
  note:{
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
    