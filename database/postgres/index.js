const { Client } = require('pg')
const client = new Client({
  user: 'berryblu',
  host: 'localhost',
  database: 'postgres',
  port: 5432
})
client.connect((err) => {
  if (err) {
    console.log(err, 'DB connection err')
  } else {
    console.log('Connected to DB')
  }
})
module.exports = client;