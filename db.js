const pg = require('pg');
// Database connection pool configuration
const pool = new pg.Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'cantina_db',
    max: 20, // maximum number of clients in the pool
});

async function connect() {
    return await pool.connect();
}

module.exports = {
    connect
}