const seats= require('../models/seat') 
function seatsGenerate(noOfSeats, seatRows) {
    if(seatRows > 25) return "too many rows our Application cannot handle";
    if(seatRows > noOfSeats) return "row cannot be more than number of seats";
    var possibleRowNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    seatRows = [...possibleRowNames.slice(0, seatRows)];

    var seats = []
    var mod = noOfSeats % seatRows.length;

    var loopCount = noOfSeats - mod;
    var x = new Array(loopCount / seatRows.length);

    seatRows.map((s, i) => {
        for (t = 0; t < x.length; t++) {
            seats.push({ seat: `${s}${t + 1}`, available : true })
        } 
    })
    if (mod) {
        rowNames = possibleRowNames.splice(seatRows.length, 1)[0];
        for (xtr = 0; xtr < mod; xtr++) {
            seats.push({ seat: `${rowNames}${xtr + 1}`, available : true })
        }
    }
    console.log(seats, seats.length);
    return seats
}



exports.createSeats = async(req,res)=>{
    console.log(req.body.seats,req.body.seatRows)
   const data = await seatsGenerate(req.body.seats,req.body.seatRows)
//  seats.save((err,data)=>{
//             if(err) {
//                 return res.status(400),json({error:err});
//             } else {
//                 res.json({data})
//             }
//         })
return res.json(data)
    }



// exports.finding = (req,res) => {
//     seats.updateMany({'Data.seat_no': '1B'}, {'$set': {
//         'Data.$.available': false
//     }})
//     .exec((err,data) =>{
//         console.log(err,data)
//                     if(err){
//                         return res.status(400).json({
//                             error:"No seats found"
//                         })
//                     }
//                     res.json({data})
//                 })
// }
