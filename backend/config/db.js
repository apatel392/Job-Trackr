const {Pool} = require('pg');
require('dotenv').config();
const isDocker = process.env.IS_DOCKER === 'true';

const pool = new Pool({
    host: 'jobtracker-db.cbscemk80mcr.us-east-2.rds.amazonaws.com',
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
