const cassandra = require('cassandra-driver');
const BigDecimal = require('cassandra-driver').types.BigDecimal;


const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'calendar'
});

module.exports = {
  placeGet: (req,res) =>{
    console.log("in Cassandra placeGet")
    const q = `SELECT * FROM place_by_id WHERE place_id=${req.params.id}`;
    client.execute(q)
    .then( (data) =>{
      let place_obj = {
        place_id: parseInt(data.rows[0]['place_id'].toString()),
        avg_rating: parseFloat(data.rows[0]['avg_rating'].toString()),
        city: data.rows[0]['city'],
        cleaning_fee: parseFloat(data.rows[0]['cleaning_fee'].toString()),
        max_capacity: parseInt(data.rows[0]['max_capacity'].toString()),
        nightly_fee: parseFloat(data.rows[0]['nightly_fee'].toString()),
        occupancy_tax_rate: parseFloat(data.rows[0]['occupancy_tax_rate'].toString()),
        reviews: parseInt(data.rows[0]['max_capacity'].toString())
      }
      res.send(place_obj);
    })
    .catch((e) =>{
      console.log("error in get request: "+ e)
      res.sendStatus(400);
    })
  }
};



  // console.log(data.rows[0]['avg_rating'].toString()