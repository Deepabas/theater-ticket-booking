const Screens = require("../models/screen")
const Seats = require("../models/seat");
const Theaters = require("../models/theater")

exports.screenById = (req, res, next, id) => {
    Screens.findById(id).exec((err, screen) => {
        if (err || !screen) {
            return res.status(400).json({
                error: "movie not found"
            });
        }
        req.screen = screen;
        next();
    });
}

exports.createTheater = async (req, res) => {
    // console.log("theater", req.body, req.body.screenName)
    let { seats = [], screenName = [] } = req.body;
    let screenNameID = []
    if (seats && screenName && seats.length != 0 && seats.length == screenName.length) {
        for (const index in seats) {
            if (Object.hasOwnProperty.call(seats, index)) {
                let seatData = await Seats(seats[index]);
                seatData = await seatData.save();
                let screenData = await Screens({ seat: seatData._id, name: screenName[index] });
                screenData = await screenData.save();
                screenNameID.push(screenData._id)
            }
        }
        let theaterInsert = await Theaters({
            theatreName: req.body.theaterName,
            ticketPrice: 100,
            cityName: "Chennai",
            screen: screenNameID
        });
        theaterInsert = await theaterInsert.save()
        console.log("screenNameID", theaterInsert)
    }
    return res.send({ message: "Theater created successfully"})
}

exports.create = (req, res) => {
    const screen = new Screens(req.body);
    screen.save((err, data) => {
        if (err) {
            return res.status(400), json({ error: err });
        } else {
            res.json({ data })
        }
    })
}

exports.listOrders = (req, res) => {
    Screens.find()
        //.populate('movie')
        .populate('seat')
        .exec((err, screen) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(screen)
        })
}