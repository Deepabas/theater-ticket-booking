const express=require("express")

const {create,finding} = require("../controllers/booking");
const {movieById} = require('../controllers/movie');
const { route } = require("./movie");

const router = express.Router();

router.post("/booking/create/:movieId",create)
//router.put("/seat/finding",finding)

router.param('movieId',movieById);

module.exports=router