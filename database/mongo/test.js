const mongoose = require('mongoose');
const userSchema = require('./schema.js');
const propertySchema = require('./schema.js');
const reviewSchema = require('./schema.js');

// create db connection
//   below is to establishe DB:
  const dbroom = mongoose.connection;
  mongoose.connect('mongodb://localhost/reviews', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  // below is to verify whether it is connected to DB:
  dbroom.on('error', console.error.bind(console, 'connection error:'));
  dbroom.once('open', function() {
    console.log(`Connected to Reviews DB`)
  });

const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);
const Review = mongoose.model('Review', reviewSchema);


var getReviews = (num, callback) => {
  let propertyId = {propertyId: num};
  Review.find(propertyId, (err, reviews) => {
    if (err) {
      callback(err);
      console.log(`DB get reviews err`);
    } else {
      callback(null, reviews)
      console.log(`DB get reviews success`)
    }
  })
}

var getUser = (num, callback) => {
  let userId = {userId: num};
  User.find(userId, (err, user) => {
    if (err) {
      callback(err);
      console.log(`DB get user err`)
    } else {
      callback(null, user);
      console.log(`DB get user success`)
    }
  })
}

var getProperty = (num, callback) => {
  let propertyId = {propertyId: num};
  Property.find(propertyId, (err, property) => {
    if (err) {
      callback(err);
      console.log(`DB get property err`);
    } else {
      callback(null, property);
      console.log(`DB get property success`);
    }
  })
}

// var getPropertyInfo = (num, callback) => {
//   var outputProperty = {}
//   getProperty(num, (err, property) => {
//     if (err) {
//       callback(err)
//     } else {
//       console.log(typeof(property), `type`)
//       // console.log(JSON.parse(property), `property[0]`)
//       console.log(property.propertyId, `propertyId`)
//       callback(null, property)
//     }
//   })
// }

// getProperty(1, (err, result) => {
//   if (err) {
//     console.log(err, `err`)
//   } else {
//     console.log(result)
//     console.log(result[0])
//     console.log(result[0]["propertyName"], `result`)
//   }
// })

module.exports = {
  getProperty: getProperty
}

