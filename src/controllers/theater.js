const Theater=require("../models/theater")

exports.theaterById= (req,res,next,id) => {
    Theater.findById(id).exec((err,theater) => {
        if(err || !theater){
            return res.status(400).json({
                error : "Theater not found"
            });
        }
        req.theater = theater;
        next();
    });
}

exports.create = (req,res) => {
    const theater = new Theater(req.body);
    theater.save((err,data)=>{
        if(err) {
            return res.status(400),json({error:err});
        } else {
            res.json({data})
        }
    })
}

exports.listOrders = (req,res) => {
    Theater.find()
    .populate('screen','name')
        .exec((err,theater) => {
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(theater)
        })
}