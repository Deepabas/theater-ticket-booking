const mongoose = require('mongoose');
var ScreenSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    //movie: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}],
    seat: [{type: mongoose.Schema.Types.ObjectId, ref: 'seats'}]
});

module.exports = mongoose.model("Screens", ScreenSchema);