const express=require("express")

const {create,listOrders} = require("../controllers/theater");
const router = express.Router();

router.post("/theater/create",create)
router.get("/theater/list",listOrders)

module.exports=router