const fs = require("fs");
const { Client } = require('pg');

// dataGen();

const client = new Client ({
  user: 'bennylee',
  database: 'kinglia',
  port: '5432'
})



client.connect()
  .then( ()=> console.log('connected'))
  .then( ()=> client.query("COPY booking FROM '/Users/bennylee/Documents/galvanize/Calendar/postgres/bookingData2.csv' DELIMITER ',' CSV HEADER;"))
  .then( (res) => console.log(res))
  .then( ()=> client.query("COPY booking FROM '/Users/bennylee/Documents/galvanize/Calendar/postgres/bookingData3.csv' DELIMITER ',' CSV HEADER;"))
  .then( (res) => console.log(res))
  .then( ()=> client.query("COPY booking FROM '/Users/bennylee/Documents/galvanize/Calendar/postgres/bookingData4.csv' DELIMITER ',' CSV HEADER;"))
  .then( (res) => console.log(res))
  .then( ()=>client.end)
  .catch(err => console.error('query error', err))



