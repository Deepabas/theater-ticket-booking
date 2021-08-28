const express=require("express")

const {create,listOrders,screenById,createTheater} = require("../controllers/screen");
const router = express.Router();

router.post("/screen/create",create)
router.get("/screen/listOrders/:screenId",listOrders)
router.post("/createTheater",createTheater)
router.param('screenId',screenById)

module.exports=router