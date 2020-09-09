const fs = require('fs');
const faker = require('faker');
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');
const userSchema = require('./schema.js');
const propertySchema = require('./schema.js')

// create db connection
  // below is to establishe DB:
  const dbreviews = mongoose.connection;
  mongoose.connect('mongodb://localhost/reviews', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  // below is to verify whether it is connected to DB:
  dbreviews.on('error', console.error.bind(console, 'connection error:'));
  dbreviews.once('open', function() {
    console.log(`Connected to Reviews DB`)
  });

const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);

var getProperty = function(num, callback) {
  let propertyId = {"propertyId": num}
  Property.find(propertyId, (err, property) => {
    if(err) {
      callback(err)
      console.log(`err`)
    } else {
      // JSON.parse(property["reviews"]);
      // for (var i = 0; i < property["reviews"].length; i++) {
      //   let userId = property["reviews"][i]["userId"];
      //   User.find(userId, (err, user) => {
      //     if (err) {
      //       console.log(err, `get user info err`)
      //     } else {
      //       property["reviews"][i]["userName"] = user["userName"];
      //       property["reviews"][i]["profileImg"] = user["profileImg"];
      //     }
      //   console.log(`success`);
      //   callback(null, property)
      //   })
      // }
      console.log(`success`)
    }
  }).explain("executionStates")
};

getProperty(8, (err, property) => {
  if(err) {
    console.log(err);
  } else {
    console.log(property["reviews"])
  }
})

// var getUsers = function(num, callback) {
//   let userId = {"userId": num};
  // User.find(userId, (err, users) => {
  //   if(err) {
  //     callback(err)
  //     console.log(`err`)
  //   } else {
  //     callback(null, users)
  //     console.log(`success`)
  //   }
  // })
// }

// getUsers((err, result) => {
//   if (err) {
//     console.log(err, `Server get user err`)
//   } else {
//     console.log(result, `Server get user success`)
//   }
// })