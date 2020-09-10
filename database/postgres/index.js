const { Client } = require('pg')
const client = new Client({
  user: 'ec2-user',
  host: '13.52.163.55',
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