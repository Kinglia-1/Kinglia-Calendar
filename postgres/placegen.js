const fs = require('fs');
const csvWriter = require('csv-write-stream')
const faker = require('faker')

const totalcount = 10000000;

const writer = csvWriter();

const placeGen = () =>{
  writer.pipe(fs.createWriteStream(`./place.csv`));
  for(let i=0;i<totalcount;i++){
    writer.write({
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
  writer.end();
}

placeGen();