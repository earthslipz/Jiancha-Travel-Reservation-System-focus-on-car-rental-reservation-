const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'jiancha',
  password: process.env.DB_PASSWORD || 'jianchapassword',
  database: process.env.DB_NAME || 'jiancha_car_rental',
  waitForConnections: true,
  connectionLimit: 10
});

// Run migrations on startup
const runMigrations = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Check if columns exist and add them if not
    const [columns] = await connection.query('SHOW COLUMNS FROM cars');
    const columnNames = columns.map(col => col.Field);
    
    if (!columnNames.includes('discount_percent')) {
      await connection.query('ALTER TABLE cars ADD COLUMN discount_percent INT DEFAULT 0');
    }
    
    if (!columnNames.includes('is_promotion')) {
      await connection.query('ALTER TABLE cars ADD COLUMN is_promotion BOOLEAN DEFAULT FALSE');
    }
    
    connection.release();
    console.log('Database migrations completed');
  } catch (err) {
    console.error('Migration error:', err);
  }
};

runMigrations();

module.exports = pool;
