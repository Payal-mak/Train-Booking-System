-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stations table
CREATE TABLE stations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL
);

-- Trains table
CREATE TABLE trains (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  train_number VARCHAR(10) UNIQUE NOT NULL,
  train_name VARCHAR(255) NOT NULL,
  from_station_id INTEGER NOT NULL,
  to_station_id INTEGER NOT NULL,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  duration VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  available_seats INTEGER NOT NULL,
  FOREIGN KEY (from_station_id) REFERENCES stations(id),
  FOREIGN KEY (to_station_id) REFERENCES stations(id)
);

-- Bookings table
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  train_id INTEGER NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  journey_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_price DECIMAL(10, 2) NOT NULL,
  pnr_number VARCHAR(10) UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (train_id) REFERENCES trains(id)
);

-- Passengers table
CREATE TABLE passengers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  seat_number VARCHAR(10),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Train Status table
CREATE TABLE train_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  train_id INTEGER NOT NULL,
  current_station_id INTEGER NOT NULL,
  next_station_id INTEGER NOT NULL,
  delay_minutes INTEGER DEFAULT 0,
  status VARCHAR(50) NOT NULL,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (train_id) REFERENCES trains(id),
  FOREIGN KEY (current_station_id) REFERENCES stations(id),
  FOREIGN KEY (next_station_id) REFERENCES stations(id)
);