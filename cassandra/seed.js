const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'calendar'
});

const query1 = "COPY place_by_id (place_id, avg_rating, city, cleaning_fee, max_capacity, nightly_fee, occupancy_tax_rate, reviews) FROM '/Users/bennylee/Documents/galvanize/Calendar/cassandra/place_by_id.csv' WITH HEADER=TRUE AND DELIMITER=’,’";

// “COPY {tableName} ({col1Name}, {col2Name}) FROM ‘/Users/admin/sample/data.csv’ with header=true and delimiter =’,’;”

client.execute('TRUNCATE place_by_id;')
  .then( () => client.execute(query1))
  .then( () => client.execute('SELECT * FROM place_by_id'))
  .then( result => console.log(result))
  .catch(e => console.log("error: "+ e))