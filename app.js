const express = require('express');
const app = express();
const morgan = require("morgan")
const mongoose = require('mongoose');
const movieRoutes = require("./src/routs/movie")
const screenRoutes = require("./src/routs/screen")
const theaterRoutes = require('./src/routs/theater')
const seatRoutes = require('./src/routs/seat')
const bookingRoutes = require('./src/routs/booking')


mongoose.connect('mongodb+srv://reshma:reshma@cluster0.edeo5.mongodb.net/mySecondDatabase',
{ useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
.then(() => console.log("mongodb connected"))
.catch(err => console.log(err));


app.use(morgan('dev'))
app.use(express.json());

app.use('/api',screenRoutes);
app.use('/api',movieRoutes);
app.use('/api',theaterRoutes);
app.use('/api',seatRoutes);
app.use('/api',bookingRoutes);
app.listen(3000, () => console.log('Server up and running'));