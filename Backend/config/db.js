const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const sslConfig = process.env.DB_SSL === 'true'
  ? {
      rejectUnauthorized: true,
      ca: fs.readFileSync(process.env.DB_CERT_PATH).toString(), // Load certificate
    }
  : false;

const pool = new Pool({
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'default_password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME || 'defaultdb',
  ssl: sslConfig,
  connectionTimeoutMillis: 10000, // 10 seconds timeout
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  max: 10, // Max connections in the pool
});

pool.connect()
  .then(() => {
    console.log(`✅ Connected to PostgreSQL at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  })
  .catch((err) => {
    console.error(`❌ Failed to connect to PostgreSQL at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.error('❗ Error Details:', {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1); // Exit process on failure
  });

module.exports = pool;
