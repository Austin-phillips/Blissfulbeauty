const { Pool } = require('pg');
require('dotenv').config()

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
});

module.exports = pool;