const fs = require('fs');
const csvWriter = require('csv-write-stream')
const faker = require('faker')

const totalcount = 10000000;
const writer1 = csvWriter();
const writer2 = csvWriter();
const writer3 = csvWriter();

const placeGen = () =>{
  writer1.pipe(fs.createWriteStream(`./placeData.csv`));
  for(let i=0;i<totalcount;i++){
    writer1.write({
      placeid: i+1,
      nightly_fee: Math.ceil(Math.random() * 300) + 60,
      cleaning_fee: Math.ceil(Math.random() * 60) + 20,
      occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
      avg_rating: Math.round((Math.random() * 5) * 100)/100,
      reviews: (Math.floor(Math.random() * 1000)),
      city: faker.address.city(),
      max_capacity: Math.ceil(Math.random() * 9) + 1
    })
  }
  console.log("placegen done");
  writer1.end();
}

const userGen = () =>{
  writer2.pipe(fs.createWriteStream(`./userData.csv`));
  for(let i=0;i<totalcount;i++){
    writer2.write({
      userId: i+1,
      fullName: faker.name.firstName() + " "+ faker.name.lastName()
    })
  }
  console.log("user gen completed");
  writer2.end();
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomTimeSlot(start) {
  let dates = {};
  dates.checkin = start.toISOString();
  dates.checkout = new Date(start.getTime()+Math.ceil((Math.random()*14)+1)*(24*60*60*1000)).toISOString();
   return dates;
}

const bookingGen = () =>{
  writer3.pipe(fs.createWriteStream(`./bookingData.csv`));
  for(let i=0;i<totalcount;i++){
    let dates = randomTimeSlot(randomDate(new Date(2020, 8, 1), new Date(2021, 8, 1)))
    writer3.write({
      bookingId: i+1,
      userId: Math.ceil(Math.random()*(totalcount-1))+1,
      placeId: Math.ceil(Math.random()*(totalcount-1))+1,
      checkin: dates.checkin,
      checkout: dates.checkout,
      adults: Math.floor(Math.random() * 6) + 1,
      children: Math.floor(Math.random() * 3) + 1,
      infants: Math.floor(Math.random() * 2) + 0,
      nightly_fee: Math.floor(Math.random() * 300) + 60,
      cleaning_fee: Math.floor(Math.random() * 150) + 50,
      occupance_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
    })
  }
  console.log("booking gen completed");
  writer3.end();
}

const dataGen = () =>{
  placeGen();
  userGen();
  bookingGen();
}

module.exports = dataGen;
