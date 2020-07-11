const fs = require('fs');
const csvWriter = require('csv-write-stream')
const faker = require('faker')

const totalcount = 10000000;

const writer = csvWriter();

const userGen = () =>{
  writer.pipe(fs.createWriteStream(`./user.csv`));
  for(let i=0;i<totalcount;i++){
    writer.write({
      fullName: faker.name.firstName() + " "+ faker.name.lastName()
    })
  }
  console.log("user gen completed");
  writer.end();
}

userGen();