const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      trim: true,
      required: true,
    },
    conducteur: {
      type: String,
      trim: true,
      required: true,
     },
     group: {
      type: String,
      trim: true,
      required: true,     
     },
    passagers: {
      type: Array, 
      ref: 'userId',
      trim: true,
      required: true,
      unique: true,
    },
    resetCode: "",
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;