const {Pool} = require('pg');
require('dotenv').config();
const isDocker = process.env.IS_DOCKER === 'true';

const pool = new Pool({
    host: 'db',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = pool;
