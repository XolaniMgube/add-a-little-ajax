require('dotenv').config({path: '../.env'})
const {Client} = require('pg')

const client = new Client({
  user: process.env.PGUSER || 'user',
  password: process.env.PGPASSWORD || 'pass',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || '5432',
  database: process.env.PGDATABASE || 'db'
})

module.exports = { client };