const { Client } = require('pg');
const client = require('../../config/psql_config.js');

client.connect()
  .then( ()=> console.log('connected'))

module.exports = {
  placeGet: (req,res) =>{
    // console.log('in postgres place GET Loop')
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
      // console.log('getting booking data');
      final.bookings = data1.rows;
      res.send(final);
    })
    .catch((e) =>{
      console.log("error in get request: "+ e)
      res.sendStatus(400);
    })
  },
  userGet: (req,res) =>{
    console.log('in postgres User GET Loop')
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
    console.log('in postgres POST booking Loop');
    let rec = req.body;
    console.log(rec)
    let postquery = `INSERT INTO booking (userid,placeid,checkin,checkout,adults,children,infants,nightly_fee,cleaning_fee,occupancy_tax_rate) VALUES (${rec.userid},${rec.placeid}, '${rec.checkin}','${rec.checkout}',${rec.adults},${rec.children},${rec.infants},${rec.nightly_fee},${rec.cleaning_fee},${rec.occupancy_tax_rate});`;
    client.query(postquery)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) =>{
      console.log("error in get request: "+ e)
      res.sendStatus(400);
    })


    // reservation = {
    //   guests: {
    //     adults: this.state.adults,
    //     children: this.state.children,
    //     infants: this.state.infants
    //   },
    //   placeid: this.state.info.id,
    //   checkin: checkindate.toISOString(),
    //   checkout: checkoutdate.toISOString()
    // }
  }
}

  // createBooking: (req,res) =>{
  //   console.log('Post loop on booking');
  //   let bookingRecord = req.body;
  //   User.updateOne(
  //     {id: req.params.id},
  //     {$push: { bookings: bookingRecord}}
  //   )
  //   .then((data) => {
  //     console.log("Record got pushed!")
  //     res.sendStatus(201);
  //   })
  //   .catch((e) =>{
  //     console.log("error in get request: "+ err)
  //     res.sendStatus(400);
  //   })
  // },
  // modifyBooking: (req,res) =>{
  //   console.log("in patch loop");
  //   bookingID = req.params.bookingid;
  //   userID = req.params.userid;
  //   console.log(`${userID} ${bookingID}`)
  //   let modify = {
  //     guests: {
  //         "adults": req.body.adults,
  //         "children": req.body.children,
  //         "infants": req.body.infants
  //     },
  //     "placeid": req.body.placeid,
  //     "checkin": "2020-08-04T07:00:00.000Z",
  //     "checkout": "2020-08-07T07:00:00.000Z"
  //   }
  //   console.log(modify);
  //   User.updateOne(
  //     {"bookings._id": bookingID },
  //     {"$set": { "bookings.$": modify}}
  //   )
  //   .then(()=> {
  //     console.log("data corrected saved");
  //     res.sendStatus(200)
  //   })
  //   .catch((e)=> {
  //     console.log("error in post request: "+ e);
  //     res.sendStatus(400);
  //   })
  // },
  // deleteBooking: (req,res) =>{
  //   console.log("in delete loop");
  //   bookingID = req.params.bookingid;
  //   userID = req.params.userid;
  //   User.updateOne(
  //     {id: userID},
  //     {$pull: {"bookings": {"_id": bookingID}}}
  //   )
  //   .then(()=> {
  //     console.log("record deleted");
  //     res.sendStatus(200)
  //   })
  //   .catch((e)=> {
  //     console.log("error in delete request: "+ e);
  //     res.sendStatus(400);
  //   })
  // }

// INSERT INTO booking (bookingid,placeid,userid,checkin,checkout,adults,children,infants,nightly_fee,cleaning_fee,occupancy_tax_rate) VALUES (50000001,92843,98342,'2021-02-02','2021-02-06',4,2,1,150.00,13.00,0.2);

// INSERT INTO booking (placeid,userid,checkin,checkout,adults,children,infants,nightly_fee,cleaning_fee,occupancy_tax_rate) VALUES (790996,216050,'2021-08-28','2021-08-31',3,1,1,346,83,0.15);



// place_id: parseInt(data.rows[0]['place_id'].toString()),
// avg_rating: parseFloat(data.rows[0]['avg_rating'].toString()),
// city: data.rows[0]['city'],
// cleaning_fee: parseFloat(data.rows[0]['cleaning_fee'].toString()),
// max_capacity: parseInt(data.rows[0]['max_capacity'].toString()),
// nightly_fee: parseFloat(data.rows[0]['nightly_fee'].toString()),
// occupancy_tax_rate: parseFloat(data.rows[0]['occupancy_tax_rate'].toString()),
// reviews: parseInt(data.rows[0]['max_capacity'].toString())

//CREATE INDEX idx_place_id ON booking(placeId);
