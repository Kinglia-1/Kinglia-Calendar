require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

//setup cluster
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//setup database Controller
const PSQL = require('./Controller/PostgresController.js');

const app = express();
const port = 3001;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}else{
  const app = express();
  const port = 3001;

  app.use('/', express.static(__dirname + '/../client/dist'));
  app.use(bodyParser.json());
  //Postgres start
  // get places request
  app.get('/api/place/:id', PSQL.placeGet);
  //post new booking
  app.post('/api/user/:id', PSQL.newbooking);

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}










// app.use(cors());

//Mongo Start
//link to controller:
// const PlaceController = require('./Controller/Place.js');
// const UserController = require('./Controller/User.js');
// // get places request
// app.get('/api/place/:id', PlaceController.get);
//get user request
// app.get('/api/user/:id', UserController.get);
// post booking to user
// app.post('/api/user/:id', UserController.createBooking);
//patch booking info
// app.patch('/api/user/:userid/booking/:bookingid', UserController.modifyBooking);
//delete booking
// app.delete('/api/user/:userid/booking/:bookingid',UserController.deleteBooking)；

// Cassandra start
// const CQL = require('./Controller/CassandraController.js');
// // get places request
// app.get('/api/place/:id', CQL.placeGet);
// //get user request
// app.get('/api/user/:id', PSQL.userGet);