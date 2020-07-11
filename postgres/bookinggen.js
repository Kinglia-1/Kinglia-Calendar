const fs = require('fs');
const csvWriter = require('csv-write-stream')
const faker = require('faker')

const totalcount = 10000000;
const writer = csvWriter();


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
  writer.pipe(fs.createWriteStream(`./booking.csv`));
  for(let i=0;i<totalcount;i++){
    let dates = randomTimeSlot(randomDate(new Date(2020, 8, 1), new Date(2021, 8, 1)))
    writer.write({
      userId: Math.ceil(Math.random()*totalcount),
      placeId: Math.ceil(Math.random()*totalcount),
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
  writer.end();
}

bookingGen();

