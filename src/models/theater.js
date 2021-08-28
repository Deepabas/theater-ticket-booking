const mongoose = require('mongoose');

var theatreSchema = new mongoose.Schema({
	theatreName: { type:String,required: true},
	ticketPrice: {type:Number, required: true},
	cityName: {type: String,required:true},
	screen: [{type: mongoose.Schema.Types.ObjectId, ref: 'Screens'}]
});

module.exports = mongoose.model("Theater", theatreSchema);