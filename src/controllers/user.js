const Users= require('../models/user')

exports.create = (req,res) => {
    const user = new Users(req.body);
    user.save((err,data)=>{
        if(err) {
            return res.status(400),json({error:err});
        } else {
            res.json({data})
        }
    })
}