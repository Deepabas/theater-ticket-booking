const mongoose = require('mongoose');


var bookingSchema = mongoose.Schema({
    theatreName: String,
    movieTitle: String,
    moviLanguage: String,
    theatreScreen:String,
    seat_no: String,
    ticketPrice: String,
    booked: {type:Boolean,
        default:false}
    });

    module.exports = mongoose.model('ticketbookings',bookingSchema)


