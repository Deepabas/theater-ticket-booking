const mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
    moviename: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    movietime:{
        type: Number,
        required: true
    },
    director:{
        type: String,
        required: true
    },
    theater: [{type: mongoose.Schema.Types.ObjectId, ref: 'Theater'}],
    screen: [{type: mongoose.Schema.Types.ObjectId, ref: 'Screens'}]

});

  module.exports = mongoose.model("Movies", MovieSchema);