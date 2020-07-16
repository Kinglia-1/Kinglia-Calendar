DROP KEYSPACE IF EXISTS calendar;

CREATE KEYSPACE IF NOT EXISTS calendar WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'};

USE calendar;

CREATE TABLE place_by_id (
	place_id bigint PRIMARY KEY,
  city text,
  max_capacity smallint,
  reviews smallint,
	nightly_fee decimal,
	cleaning_fee decimal,
	occupancy_tax_rate decimal,
	avg_rating decimal
);

CREATE TABLE booking_by_placeid (
  place_id bigint,
  user_id uuid,
  booking_id bigint,
  checkin DATE,
  checkout DATE,
  adults smallint,
  children smallint,
  infants smallint,
  nightly_fee decimal,
  cleaning_fee decimal,
  occupancy_tax_rate decimal,
  PRIMARY KEY (place_id, user_id)
);

CREATE TABLE booking_by_userid (
  booking_id uuid,
  user_id uuid,
  place_id uuid,
  checkin DATE,
  checkout DATE,
  adults smallint,
  children smallint,
  infants smallint,
  nightly_fee decimal,
  cleaning_fee decimal,
  occupancy_tax_rate decimal,
  PRIMARY KEY (user_id, place_id)
);

