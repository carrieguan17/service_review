const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'http://18.144.99.54',
  database: 'review',
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
// change test