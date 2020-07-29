  -- CREATE DATABASE kinglia;

  -- CREATE SCHEMA calendar;

  -- CREATE TABLE place(
  --   placeId SERIAL PRIMARY KEY,
  --   nightly_fee decimal(12,2) NOT NULL,
  --   cleaning_fee decimal(12,2) NOT NULL,
  --   occupancy_tax_rate decimal(12,2) NOT NULL,
  --   avg_rating decimal(12,2) NOT NULL,
  --   reviews smallint NOT NULL,
  --   city VARCHAR(45) NOT NULL,
  --   max_capacity smallint NOT NULL
  -- );

  -- CREATE TABLE user_by_id(
  --   userId SERIAL PRIMARY KEY,
  --   fullName VARCHAR(45) NOT NULL
  -- );

  -- CREATE TABLE booking(
  --   bookingId SERIAL PRIMARY KEY,
  --   userId INTEGER REFERENCES user_by_id(userId),
  --   placeId INTEGER REFERENCES place(placeId),
  --   checkin DATE NOT NULL,
  --   checkout DATE NOT NULL,
  --   adults smallint NOT NULL,
  --   children smallint NOT NULL,
  --   infants smallint NOT NULL,
  --   nightly_fee decimal(12,2) NOT NULL,
  --   cleaning_fee decimal(12,2) NOT NULL,
  --   occupancy_tax_rate decimal(12,2) NOT NULL
  -- );

  --   CREATE TABLE newbooking(
  --   ID SERIAL PRIMARY KEY,
  --   userId INTEGER REFERENCES user_by_id(userId),
  --   placeId INTEGER REFERENCES place(placeId),
  --   checkin DATE NOT NULL,
  --   checkout DATE NOT NULL,
  --   adults smallint NOT NULL,
  --   children smallint NOT NULL,
  --   infants smallint NOT NULL,
  --   nightly_fee decimal(12,2) NOT NULL,
  --   cleaning_fee decimal(12,2) NOT NULL,
  --   occupancy_tax_rate decimal(12,2) NOT NULL
  -- );

