const fs = require("fs");
const dataGen = require('./datagen.js');
const { Client } = require('pg');

// dataGen();

const client = new Client ({
  user: 'bennylee',
  database: 'kinglia',
  port: '5432'
})



client.connect()
  .then( ()=> console.log('connected'))
  .then( ()=> client.query("COPY place from '/Users/bennylee/Documents/galvanize/Calendar/postgres/placeData.csv' DELIMITER ',' CSV HEADER;"))
  .then( (res) => console.log(res))
  .then( ()=> client.query("COPY user_by_id from '/Users/bennylee/Documents/galvanize/Calendar/postgres/userData.csv' DELIMITER ',' CSV HEADER;"))
  .then( (res) => console.log(res))
  .then( ()=> client.query("COPY booking from '/Users/bennylee/Documents/galvanize/Calendar/postgres/bookingData.csv' DELIMITER ',' CSV HEADER;"))
  .then( (res) => console.log(res))
  .then( ()=>client.end)
  .catch(err => console.error('query error', err))




// pg.connect(function(err, client, done) {
//   var stream = client.query(copyFrom('COPY  from 'FILE_PATH.csv' WITH DELIMITER ',' CSV HEADER;'));
//   var fileStream = fs.createReadStream('some_file.tsv')
//   fileStream.on('error', done);
//   fileStream.pipe(stream).on('finish', done).on('error', done);
// });

// let stream = fs.createReadStream("./place.csv");
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push(data);
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();

//     // connect to the PostgreSQL database
//     // save csvData
//   });

// stream.pipe(csvStream);

// COPY  from 'FILE_PATH.csv' WITH DELIMITER ',' CSV HEADER;
