const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use('/calendar/', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


//Mongo Start
//link to controller:
const PlaceController = require('./Controller/Place.js');
const UserController = require('./Controller/User.js');
// // get places request
// app.get('/api/place/:id', PlaceController.get);
//get user request
app.get('/api/user/:id', UserController.get);
// post booking to user
app.post('/api/user/:id', UserController.createBooking);
//patch booking info
app.patch('/api/user/:userid/booking/:bookingid', UserController.modifyBooking);
//delete booking
app.delete('/api/user/:userid/booking/:bookingid',UserController.deleteBooking)

//Postgres start
// const PSQL = require('./Controller/PostgresController.js');
// get places request
// app.get('/api/place/:id', PSQL.placeGet);
//get user request
// app.get('/api/user/:id', PSQL.userGet);

// Cassandra start
const CQL = require('./Controller/CassandraController.js');
// // get places request
app.get('/api/place/:id', CQL.placeGet);
// //get user request
// app.get('/api/user/:id', PSQL.userGet);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));