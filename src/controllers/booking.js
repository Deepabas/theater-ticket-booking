const Bookings= require('../models/booking') 
const seats= require('../models/seat')

exports.create = async(req,res) => {
    await checkavailability(req,res);
    const booking = new Bookings(req.body);
    booking.save(async (err,data)=>{
        if(err) {
            return res.status(400),json({error:err});
        }
        const a = await finding(req,res);
        res.json({data})
    })
}

const finding = async(req,res) => {
    req.body.seat_no.map((item) => {
        seats.update({'Data.seat_no': item}, {'$set': {
            'Data.$.available': false
        }})
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No seats found"
                })
            }
            res.json({data})
        })
    })
}


const checkavailability = async(req,res) => {
    seats.find(o => o.Data.seat_no == '1A')
    //seats.findOne({'Data.seat_no':'1A','Data.available':false})
    //seats.find( {Data : {$elemMatch : {seat_no : "1A"}}} )
    .exec((err,data) =>{
        if(err){
            return res.status(400).json({
                error:"No seats found"
            })
        }
        res.json({data})
    })
}