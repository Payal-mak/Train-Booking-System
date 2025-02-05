import { Database } from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

let db: any = null;

export async function initializeDatabase() {
  if (db) return db;

  const dbPath = path.join(process.cwd(), 'data', 'train_booking.db');
  const schemaPath = path.join(process.cwd(), 'src', 'db', 'schema.sql');

  // Ensure data directory exists
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Open database connection
  db = await open({
    filename: dbPath,
    driver: Database
  });

  // Check if database needs initialization
  const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
  
  if (!tableExists) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await db.exec(schema);
  }

  return db;
}

export async function getDb() {
  if (!db) {
    await initializeDatabase();
  }
  return db;
}

// User related queries
export async function createUser(name: string, email: string, passwordHash: string) {
  const db = await getDb();
  return db.run(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
}

// Booking related queries
export async function createBooking(
  userId: number,
  trainId: number,
  journeyDate: string,
  totalPrice: number,
  passengers: Array<{ name: string; age: number }>
) {
  const db = await getDb();
  
  // Generate PNR number (you might want to implement a more sophisticated generation method)
  const pnrNumber = Math.random().toString(36).substring(2, 12).toUpperCase();
  
  try {
    await db.run('BEGIN TRANSACTION');

    // Create booking
    const bookingResult = await db.run(
      `INSERT INTO bookings (user_id, train_id, journey_date, total_price, pnr_number)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, trainId, journeyDate, totalPrice, pnrNumber]
    );

    // Add passengers
    for (const passenger of passengers) {
      await db.run(
        'INSERT INTO passengers (booking_id, name, age) VALUES (?, ?, ?)',
        [bookingResult.lastID, passenger.name, passenger.age]
      );
    }

    await db.run('COMMIT');
    return pnrNumber;
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}

// Train status related queries
export async function updateTrainStatus(
  trainId: number,
  currentStationId: number,
  nextStationId: number,
  delayMinutes: number,
  status: string
) {
  const db = await getDb();
  return db.run(
    `INSERT INTO train_status (train_id, current_station_id, next_station_id, delay_minutes, status)
     VALUES (?, ?, ?, ?, ?)`,
    [trainId, currentStationId, nextStationId, delayMinutes, status]
  );
}

export async function getTrainStatus(trainNumber: string) {
  const db = await getDb();
  return db.get(
    `SELECT ts.*, t.train_number, t.train_name,
            cs.name as current_station_name,
            ns.name as next_station_name
     FROM train_status ts
     JOIN trains t ON ts.train_id = t.id
     JOIN stations cs ON ts.current_station_id = cs.id
     JOIN stations ns ON ts.next_station_id = ns.id
     WHERE t.train_number = ?
     ORDER BY ts.last_updated DESC
     LIMIT 1`,
    [trainNumber]
  );
}

// Export other necessary database operations
export default {
  initializeDatabase,
  getDb,
  createUser,
  getUserByEmail,
  createBooking,
  updateTrainStatus,
  getTrainStatus
};