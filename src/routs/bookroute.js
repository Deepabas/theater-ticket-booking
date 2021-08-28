const users = require('express').Router();
const {theaterName,listsOfSeats,movieBooking,verifyUser} = require('../controllers/bookingcontroller')
const {userAuth,checkRole } = require('../controllers/authcontroller')


users.get('/',async(req,res)=>{
    await theaterName(req, res)
});

users.get('/:id',async(req,res)=>{
    await listsOfSeats(req,res)
});




users.post('/ticketbooking',verifyUser,userAuth,checkRole(['user']), async(req,res)=>{
    await movieBooking(req,res)
});


users.post('/cancelbooking/:id', userAuth,checkRole(['user']),async(req,res)=>{
    await cancelBooking(req,res)
});










module.exports = users;