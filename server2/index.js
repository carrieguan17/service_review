// dependencies
const express = require('express');
const app = express();
PORT = 2250;
const DB = require('../database/postgres/index.js')
// const dbreviews = require('../database/mongo/test.js');
const bodyparser = require('body-parser')


// middleware
// app.use(express.static(filePath));
// app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// route
// app.get('/reviews/property', (req, res) => {
//   let num = req.body.num;
//   dbreviews.getProperty(num, (err, result) => {
//     if (err) {
//       res.status(401)
//       res.end()
//       console.log(err, `Server get property err`)
//     } else {
//       res.status(201)
//       console.log(result[0])
//       console.log(`Server get property success`)
//       // JSON.parse(result)
//       res.send(result)
//       // res.end()
//     }
//   })
// })

app.get ('/reviews', (req, res) => {
  let query = `SELECT review_date, review_comment, user_name, user_profileImg
  FROM reviews
  INNER JOIN users
  ON reviews.user_id = users.user_id AND property_id = ${req.body.num};`
  DB.query(query, (err, results) => {
    if (err) {
      console.log(err, `Server get err`)
      res.status(400).end()
    } else {
      console.log(`Server get success`)
      res.status(201).send(results.rows)
    }
  })
})

app.get ('/reviews/property', (req, res) => {
  let query = `SELECT property_name, property_owner, rating
  FROM properties
  WHERE property_id = ${req.body.num};`
  DB.query(query, (err, results) => {
    if (err) {
      console.log(err, `Server get err`)
      res.status(400).end()
    } else {
      console.log(`Server get success`)
      res.status(201).send(results.rows)
    }
  })
})

app.post ('/reviews', (req, res) => {
  let date = req.body.review_date;
  let comment = req.body.review_comment;
  let query = `INSERT INTO reviews(property_id, user_id, review_date, review_comment)
  VALUES (${req.body.property_id}, ${req.body.user_id}, '${date}', '${comment}');`
  DB.query(query, (err, results) => {
    if (err) {
      console.log(err, `Server post err`)
      res.status(400).end()
    } else {
      console.log(`Server post success`)
      res.status(201).end()
    }
  })
})


// start server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})