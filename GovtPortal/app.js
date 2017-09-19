const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database' +config.database);
});

//On error
mongoose.connection.on('error', (err) => {
    console.log('Database error' +err);
});

const app = express();
const users = require('./routes/users');
const datatable = require('./routes/datatable');
const updateusers = require('./routes/updateusers');


// Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

//set Static Folder
//app.use(express.static(Path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json())

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/datatable', datatable);
app.use('/updateusers', updateusers);


//Index Route
app.get('/',(req, res) => {
   res.send('This is an invalid end point');
});

//Start Server
app.listen(port, ()=> {
    console.log('Server started on port'+port);
});