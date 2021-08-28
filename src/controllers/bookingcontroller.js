const ticketbookings = require("../models/bookingmodel")
const theaters = require("../models/theater")
const seats = require("../models/seat")
const Screens = require("../models/screen")
const Movies = require("../models/movie")

const theaterName = async (req, res) => {
  const moviename = req.query.moviename;

  Movies.find({moviename:moviename})
  .populate('theater','theatreName')
  .populate('screen','name')
      .exec((err,movie) => {
          if(err){
              return res.status(400).json({
                  error:(err)
              })
          }
          res.json(movie)
      })
}



const listsOfSeats = async (req, res) => {
  const screenId = req.params.id;
    await Screens.find(
    { _id: screenId},)
   .populate ('seat')
      .exec((err,screen) => {
          if(err){
              return res.status(400).json({
                  error:(err)
              })
          }
          res.json(screen)
      })
    }



 


const movieBooking = async (req, res) => {
    var Booking = new ticketbookings({
        theatreName: req.body.theatreName,
        movieTitle: req.body.movieTitle,
        moviLanguage: req.body.moviLanguage,
        theatreScreen:req.body.theatreScreen,
        ticketPrice: req.body.ticketPrice,
        seat_no: req.body.seat_no,
     });
     console.log(Booking);

     Booking.save(function(err, docs){
       if ( err ) throw err;
       console.log("Show Assigned Successfully");
       res.json(docs);
     });
    }
    const verifyUser = async(req,res) =>{
        const id = req.query.id;
        await seats.findOneAndUpdate({ _id: id },
             {available: false});
    res.send("account")
    }


//      const cancelBooking = async(req,res) =>{
//       const id = req.params.id;
//       await ticketbookings.findOneAndUpdate({ _id: id },
//            {booked: false});
//   res.send("successfully canceled your tickets")
//   }

module.exports = {theaterName,listsOfSeats,movieBooking,verifyUser}