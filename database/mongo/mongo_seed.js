// references
const fs = require('fs');
const faker = require('faker');
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');
const userSchema = require('./schema.js');
const propertySchema = require('./schema.js');
const reviewSchema = require('./schema.js');

// create db connection
  // // below is to establishe DB:
  // const dbroom = mongoose.connection;
  // mongoose.connect('mongodb://localhost/property', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  // // below is to verify whether it is connected to DB:
  // dbroom.on('error', console.error.bind(console, 'connection error:'));
  // dbroom.once('open', function() {
  //   console.log(`Connected to Room DB`)
  // });

// below is to write records into csv file
  // below is a random number generator
  // const rdm = (min, max) => {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // };
  // below is to add 0 before review id till the review id reaches 7 digits
  const zeroPad = (num) => {
    return num.toString().padStart(9, "0");
  };

var userArray = [];
const seedUserData = (num) => {
  let userString = `userId,userName,profileImg,reviewIds\n`;
  for (var i = 0; i < num; i++) {
    var user = {
      userId: zeroPad(i),
      userName: faker.name.firstName(),
      profileImg: faker.image.imageUrl(),
      reviewIds: []
    }
    userString += `${JSON.stringify(user)}\n`;
    userArray.push(user)
  }
    return new Promise((resolve,reject) => {
      fs.writeFile(`mongouserdata.csv`, userString, (err, data) => {
        if(err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    });
}

var reviewNumbers = [37, 42, 65, 21, 66, 28, 14, 18, 16, 22, 29, 34, 38]

const seedPropertyData = (num) => {
  let propertyString = `propertyId,propertyName,propertyOwner,propertyOwnerImg,rating,numOfReviews,reviews\n`;
  for (var i = 0; i < num; i++) {
    var reviewsArray = [];
    var numOfReviews = reviewNumbers[Math.floor(i/1000000)];
    for (var j = 0; j < numOfReviews; j++) {
      var review = {
        reviewId: zeroPad(j + i * 50),
        userId: zeroPad(faker.random.number()),
        reviewDate: faker.date.past(),
        reviewComment: faker.lorem.sentences()
      };
      reviewsArray.push(review);
      for (var k = 0; k < userArray.length; k++) {
        if (userArray[k].userId === review.userId) {
          userArray[k].reviewIds.push(review.reviewId)
        }
      }
    };
    var property = {
      propertyId: zeroPad(i),
      propertyName: faker.address.streetAddress(),
      propertyOwner: faker.name.firstName(),
      propertyOwnerImg: faker.image.imageUrl(),
      rating: ((Math.random() * 5) + 3).toFixed(2),
      numOfReviews: numOfReviews,
      reviews: reviewsArray
    };
    propertyString += `${JSON.stringify(property)}\n`;
  }
  return new Promise((resolve,reject) => {
    fs.writeFile(`mongopropertydata.csv`, propertyString, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  });
}

// below is to seed 2 records
seedUserData(2);
seedPropertyData(2)

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

// mongoose.disconnect();

// below is to seed 10M records

// write down the speed

// var propertyArray = seedPropertyData(2);

// const csvWriterUser = createCsvWriter({
//   path: '/Users/berryblu/Desktop/assignment/exercise/reviews-section/database/mongo/mongouserdata.csv',
//   header: [
//       {id: 'userId', title: 'userId'},
//       {id: 'userName', title: 'userName'},
//       {id: 'profileImg', title: 'profileImg'},
//       {id: 'reviewIds', title: 'reviewIds'},
//   ]
// });
// csvWriterUser.writeRecords(userArray)       // returns a promise
//   .then(() => {console.log('success')})
  // .catch(() => {console.log('error', err)})

// const csvWriterProperty = createCsvWriter({
//   path: '/Users/berryblu/Desktop/assignment/exercise/reviews-section/database/mongo/mongopropertydata.csv',
//   header: [
//       {id: 'propertyId', title: 'propertyId'},
//       {id: 'propertyName', title: 'propertyName'},
//       {id: 'propertyOwner', title: 'propertyOwner'},
//       {id: 'propertyOwnerImg', title: 'propertyOwnerImg'},
//       {id: 'rating', title: 'rating'},
//       {id: 'numOfReviews', title: 'numOfReviews'},
//       {id: 'reviews', title: 'reviews'}
//   ]
// });
// csvWriterProperty.writeRecords(propertyArray)       // returns a promise
//   .then(() => {console.log('success')})
  // .catch(() => {console.log('error', err)})


