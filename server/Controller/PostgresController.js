const { Client } = require('pg');

const client = new Client ({
  user: 'bennylee',
  database: 'kinglia',
  port: '5432'
})

client.connect()
  .then( ()=> console.log('connected'))
10000000
9999999

module.exports = {
  placeGet: (req,res) =>{
    console.log('in postgres Place GET Loop')
    let q = `SELECT * FROM place WHERE placeid=${req.params.id}`;
    client.query(q)
    .then((data) => {
      console.log("Get Place Data")
      console.log(data.rows[0]);
      res.send(data.rows[0]);
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
      console.log("Get User Data")
      console.log(data.rows[0]);
      res.send(data.rows[0]);
    })
    .catch((e) =>{
      console.log("error in get request: "+ e)
      res.sendStatus(400);
    })
  },

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
}
