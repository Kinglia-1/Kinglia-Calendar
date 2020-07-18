const fs = require("fs");
const client = require('../config/psql.js');

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

  //COPnewbooking FROM '/Users/bennylee/Documents/galvanize/Calendar/postgres/temp.csv DELIMITER ',' CSV HEADER;
  // INSERT INTO newbooking VALUES (DEFAULT,790996,216050,'2021-08-28','2021-08-31',3,1,1,346,83,0.15);

  COPY newbooking FROM '/Users/bennylee/Documents/galvanize/Calendar/postgres/temp.csv' DELIMITER ',' CSV HEADER;

