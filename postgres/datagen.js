const fs = require('fs');
const csvWriter = require('csv-write-stream')
const faker = require('faker')

const totalPlaceCount = 1000000;
const totalUserCount = 1000000;
const totalBookingCount = 10000000;
const writer1 = csvWriter();
const writer2 = csvWriter();
const writer3 = csvWriter();

const placeGen = () =>{
  writer1.pipe(fs.createWriteStream(`./placeData.csv`));
  for(let i=0;i<totalPlaceCount;i++){
    if((i % (totalPlaceCount / 10)) === 0){
      console.log("We are at placeGen "+i/totalPlaceCount);
    }
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
  console.log("place Gen completed");
  writer1.end();
}

const userGen = () =>{
  writer2.pipe(fs.createWriteStream(`./userData.csv`));
  for(let i=0;i<totalUserCount;i++){
    if((i % (totalUserCount / 10)) === 0){
      console.log("We are at userGen "+i/totalUserCount);
    }
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
writer3.pipe(fs.createWriteStream(`./bookingData4.csv`));
let bookingCounter = 0;

const bookingGen = () =>{
  let writer3pass = true;
  do{
    if((bookingCounter % (totalBookingCount / 10)) === 0){
      console.log("We are at bookingGen "+bookingCounter/totalBookingCount);
    }
    let dates = randomTimeSlot(randomDate(new Date(2020, 8, 1), new Date(2021, 8, 1)))
    let writer3obj = {
      bookingId: (bookingCounter+1)+(10000000*4),
      userId: Math.ceil(Math.random()*(totalUserCount-1))+1,
      placeId: Math.ceil(Math.random()*(totalPlaceCount-1))+1,
      checkin: dates.checkin,
      checkout: dates.checkout,
      adults: Math.floor(Math.random() * 6) + 1,
      children: Math.floor(Math.random() * 3) + 1,
      infants: Math.floor(Math.random() * 2) + 0,
      nightly_fee: Math.floor(Math.random() * 300) + 60,
      cleaning_fee: Math.floor(Math.random() * 150) + 50,
      occupance_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2)
    };
    if(bookingCounter === totalBookingCount){
      writer3.write(writer3obj);
    }else{
      writer3pass = writer3.write(writer3obj);
    }
    bookingCounter++;
  } while(bookingCounter<totalBookingCount && writer3pass);

  if(bookingCounter<totalBookingCount){
      writer3.once("drain",bookingGen);
  }
  if(bookingCounter === totalBookingCount){
    console.log("booking gen completed");
    writer3.end();
  }
}

const dataGen = () =>{
  // placeGen();
  // userGen();
  bookingGen();
}
dataGen();

module.exports = dataGen;


// do{
//   if((bookingGenCounter % (totalBookingCount / 10)) === 0){
//    console.log("We are at bookingGen "+bookingGenCounter/totalBookingCount);
//  }

//  let writer2obj = {
//    placeId: currentPlace,
//    userId: currentUser,
//    adults: adults,
//    bookingId: bookingId,
//    checkin: checkin,
//    checkout: checout,
//    children: children,
//    cleaning_fee: cleaning_fee,
//    infants: infants,
//    nightly_fee: nightly_fee,
//    occupance_tax_rate: occupance_tax_rate
//  }

//  if( bookingGenCounter === totalBookingCount){
//    writer2.write(writer2obj);
//  } else {
//    writer2pass = writer2.write(writer2obj);
//  }
//  bookingGenCounter++;
// } while(bookingGenCounter<=totalBookingCount && writer2pass);
// if(bookingGenCounter<totalBookingCount){
//  if(!writer2pass){
//    writer2.once("drain",bookingGen);
//  }
// }
// if(bookingGenCounter === totalBookingCount){
//  console.log("booking gen completed");
//  writer2.end();
// }
// }