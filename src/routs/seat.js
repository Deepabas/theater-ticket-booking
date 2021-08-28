const express = require("express")

const { createSeats } = require("../controllers/seat");
const router = express.Router();


router.post("/seat/create", createSeats)

module.exports = router