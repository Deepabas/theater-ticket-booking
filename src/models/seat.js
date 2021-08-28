var mongoose = require("mongoose");


var SeatSchema = new mongoose.Schema({
  seats: { type: Number, required: true },
  seatRows: { type: Number, required: true }
})

module.exports = mongoose.model("seats", SeatSchema);