const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	theatreName: { type:String,required: true},
	name: {type:Number, required: true},
	moviename: {type: String,required:true},
	seat_no: {type: String,required:true},
    booking : {type: String,required:true}
});

module.exports = mongoose.model("Users", userSchema);