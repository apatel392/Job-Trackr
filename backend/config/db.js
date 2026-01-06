const {Pool} = require('pg');
require('dotenv').config();
const isDocker = process.env.IS_DOCKER === 'true';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
    }
});

module.exports = pool;

//localhost
/*
   ssl: {
    rejectUnauthorized: false
    }
*/