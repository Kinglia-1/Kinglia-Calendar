const db  = require('../config/mongo_config.js');
const Place = require('./Place.js');
const User = require('./User.js')
const faker = require('faker');

let placeArray = [];
let userArray = [];

for (let i = 0; i < 100; i++) {
  let placeSample = {
    id: i,
    nightly_fee: Math.ceil(Math.random() * 300) + 60,
    cleaning_fee: Math.ceil(Math.random() * 60) + 20,
    occupancy_tax_rate: (Math.round((Math.random()*.05)*1000)/1000) + .08,
    avg_rating: Math.round((Math.random() * 5) * 100)/100,
    reviews: (Math.floor(Math.random() * 1000)),
    city: faker.address.city(),
    max_capacity: Math.ceil(Math.random() * 9) + 1
  }
  placeArray.push(placeSample);

  let userSample = {
    id: i,
    name: faker.name.findName(),
    bookings: []
  }
  userArray.push(userSample);
}

const insertSampleCalendar = function() {
  Place.deleteMany()
  .then( ()=> Place.create(placeArray))
  .then( ()=> console.log("completed Place db"))
  .catch( (err) => console.log("error: "+ err))
  .then(()=> User.deleteMany())
  .then( ()=> User.create(userArray))
  .then( ()=> {console.log("completed User db")})
  .catch( (err) => console.log("error: "+ err))

};

insertSampleCalendar();
