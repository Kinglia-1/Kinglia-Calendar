const client = require('../../config/psql_config.js');

client.connect()
  .then( ()=> console.log('DB connected'))

module.exports = {
  placeGet: (req,res) =>{
    let final = {};
    let pid = req.params.id;
    let q = `SELECT * FROM place WHERE placeid=${pid}`;
    client.query(q)
    .then((data) => {
      final = data.rows[0];
      let bookingsearch=`SELECT checkin, checkout FROM booking WHERE placeid=${pid}`;
      return client.query(bookingsearch);
    })
    .then((data1) => {
      final.bookings = data1.rows;
      res.send(final);
    })
    .catch((e) =>{
      console.log("error in get request: "+ e)
      res.sendStatus(400);
    })
  },
  userGet: (req,res) =>{
    let q = `SELECT * FROM place WHERE placeid=${req.params.id}`;
    client.query(q)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((e) =>{
      console.log("error in user get request: "+ e)
      res.sendStatus(400);
    })
  },
  newbooking: (req,res) =>{
    // console.log('in postgres POST booking Loop');
    let rec = req.body;
    let postquery = `INSERT INTO booking (userid,placeid,checkin,checkout,adults,children,infants,nightly_fee,cleaning_fee,occupancy_tax_rate) VALUES (${rec.userid},${rec.placeid}, '${rec.checkin}','${rec.checkout}',${rec.adults},${rec.children},${rec.infants},${rec.nightly_fee},${rec.cleaning_fee},${rec.occupancy_tax_rate});`;
    client.query(postquery)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) =>{
      console.log("error in get request: "+ e)
      res.sendStatus(400);
    })
  }
}
