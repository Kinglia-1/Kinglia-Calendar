// const client = require('../../config/psql_config.js');
const {pool, client} = require('../../psql_config.js');

module.exports = {
  placeGet: (req,res) =>{
    let pid = req.params.id;
    let q = 'SELECT place.placeid, place.nightly_fee, place.cleaning_fee, place.occupancy_tax_rate, place.avg_rating, place.reviews, place.max_capacity, booking.checkin, booking.checkout FROM place LEFT JOIN booking ON place.placeid = booking.placeid WHERE place.placeid=$1';
    pool
      .connect()
      .then(client =>{
        return client
          .query(q, [pid])
          .then(response => {
            client.release();
            const data = {
              id: response.rows[0].placeid,
              nightly_fee: response.rows[0].nightly_fee,
              cleaning_fee: response.rows[0].cleaning_fee,
              occupancy_tax_rate: response.rows[0].occupancy_tax_rate,
              avg_rating: response.rows[0].avg_rating,
              reviews: response.rows[0].reviews,
              max_capacity: response.rows[0].max_capacity,
              bookings: [],
            };

            for (let i = 0; i < response.rows.length; i += 1) {
              data.bookings.push({
                checkin: response.rows[i].checkin,
                checkout: response.rows[i].checkout,
              });
            }
            res.send(data);
          })
          .catch((e) =>{
            client.release()
            console.log("error in get request: "+ e)
            res.sendStatus(400);
          })
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


// placeGet: (req,res) =>{
//   let final = {};
//   let pid = req.params.id;
//   let q = `SELECT * FROM place WHERE placeid=${pid}`;
//   client.query(q)
//   .then((data) => {
//     final = data.rows[0];
//     let bookingsearch=`SELECT checkin, checkout FROM booking WHERE placeid=${pid}`;
//     return client.query(bookingsearch);
//   })
//   .then((data1) => {
//     final.bookings = data1.rows;
//     res.send(final);
//   })
//   .catch((e) =>{
//     console.log("error in get request: "+ e)
//     res.sendStatus(400);
//   })
// },