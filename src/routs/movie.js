const express=require("express")

const {create,listOrders,listTheater,movieById} = require("../controllers/movie");
const router = express.Router();

router.post("/movie/create",create)
router.get("/movie/listOrders",listOrders)
router.get("/movie/listTheater/:movieId",listTheater)

router.param('movieId',movieById);

module.exports=router