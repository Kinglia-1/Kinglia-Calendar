const fs = require('fs');
const csvWriter = require('csv-write-stream')
const faker = require('faker')

const totalPlaceCount = 10000000;
const totalBookingCount = 10000000;
const totalUserCount = 10000000;
const writer1 = csvWriter();
const writer2 = csvWriter();
const writer3 = csvWriter();

const genPlaceUUID = () => {
  let placeuuid = [];
  for(let i=0;i<totalPlaceCount;i++){
    placeuuid.push(faker.random.uuid())
  }
  return placeuuid;
}

const genUserUUID = () => {
  let useruuid = [];
  for(let i=0;i<totalUserCount;i++){
    useruuid.push(faker.random.uuid())
  }
  return useruuid;
}

const placeUUID = genPlaceUUID();
const userUUID = genUserUUID();

const placeGen = () =>{
  writer1.pipe(fs.createWriteStream(`./place_by_id.csv`));
  for(let i=0;i<totalPlaceCount;i++){
    writer1.write({
      place_id: placeUUID[i],
      avg_rating: (Math.round((Math.random() * 5) * 100)/100).toFixed(2),
      city: faker.address.city(),
      cleaning_fee: (Math.ceil(Math.random() * 60) + 20).toFixed(2),
      max_capacity: Math.ceil(Math.random() * 9) + 1,
      nightly_fee: (Math.ceil(Math.random() * 300) + 60).toFixed(2),
      occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
      reviews: (Math.floor(Math.random() * 100)),
    })
  }
  console.log("place gen completed");
  writer1.end();
}
// COPY place_by_id FROM '/Users/bennylee/Documents/galvanize/Calendar/cassandra/place_by_id.csv' WITH HEADER=TRUE AND DELIMITER=',';

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
  writer2.pipe(fs.createWriteStream(`./booking_by_placeid.csv`));
  writer3.pipe(fs.createWriteStream(`./booking_by_userid.csv`));
  for(let i=0;i<totalBookingCount;i++){
    let bookingId = faker.random.uuid();
    let dates = randomTimeSlot(randomDate(new Date(2020, 8, 1), new Date(2021, 8, 1)))
    let userNumber = Math.ceil(Math.random()*(totalUserCount-1));
    let placeNumber = Math.ceil(Math.random()*(totalPlaceCount-1));
    let currentUser = userUUID[userNumber];
    let currentPlace = placeUUID[placeNumber];
    let checkin = (dates.checkin).slice(0,10);
    let checout = (dates.checkout).slice(0,10);
    let adults = Math.floor(Math.random() * 6) + 1;
    let children = Math.floor(Math.random() * 3) + 1;
    let infants = Math.floor(Math.random() * 2) + 0;
    let nightly_fee = Math.floor(Math.random() * 300) + 60;
    let cleaning_fee = Math.floor(Math.random() * 150) + 50;
    let occupance_tax_rate = ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2);

    writer2.write({
      placeId: currentPlace,
      userId: currentUser,
      adults: adults,
      bookingId: bookingId,
      checkin: checkin,
      checkout: checout,
      children: children,
      cleaning_fee: cleaning_fee,
      infants: infants,
      nightly_fee: nightly_fee,
      occupance_tax_rate: occupance_tax_rate,
    })
    writer3.write({
      userId: currentUser,
      placeId: currentPlace,
      adults: adults,
      bookingId: bookingId,
      checkin: checkin,
      checkout: checout,
      children: children,
      cleaning_fee: cleaning_fee,
      infants: infants,
      nightly_fee: nightly_fee,
      occupance_tax_rate: occupance_tax_rate,
    })
  }
  console.log("booking gen completed");
  writer2.end();
  writer3.end();
}




const dataGen = () =>{
  placeGen();
  bookingGen();
}

dataGen();

module.exports = dataGen;
