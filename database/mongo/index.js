const fs = require('fs');
const faker = require('faker');
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');
const userSchema = require('./schema.js');
const propertySchema = require('./schema.js')

// create db connection
  // below is to establishe DB:
  const dbroom = mongoose.connection;
  mongoose.connect('mongodb://localhost/reviews', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  // below is to verify whether it is connected to DB:
  dbroom.on('error', console.error.bind(console, 'connection error:'));
  dbroom.once('open', function() {
    console.log(`Connected to Reviews DB`)
  });

const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);

var getProperty = function(num, callback) {
  let propertyId = {"propertyId": 8}
  Property.find(propertyId, (err, users) => {
    if(err) {
      callback(err)
      console.log(`err`)
    } else {
      JSON.parse(property["reviews"])
      for (var i = 0; i < property["reviews"].length; i++) {
        let userId = property["reviews"][i]["userId"];
        User.find(userId, (err, user) => {
          if (err) {
            callback(err)
            console.log(err, `get user info err`)
          } else {
            callback(null, property, user)
          }
      console.log(`success`)
    }
  }).explain("executionStates")
}

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