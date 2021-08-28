const mongoose = require('mongoose');
var BookingSchema = new mongoose.Schema({
    theaterName: {
      type: String,
      required: true
    },
    seat_no:{
        type: Array,
        required: true,
        unique:true
    },
    moviename:{
        type: String,
        required: true
    }
});

  module.exports = mongoose.model("Bookings", BookingSchema);