const fs = require('fs');
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');
// const rdm = require('../mongo/mongo_seed.js');
// const zeroPadR = require('../mongo/mongo_seed.js');
// const zeroPadUP = require('../mongo/mongo_seed.js');

// below is to write records into csv file
  // below is a random number generator
  // const rdm = (min, max) => {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // };
  // below is to add 0 before review id till the review id reaches 7 digits
  const zeroPad = (num) => {
    return num.toString().padStart(9, "0");
  };
  var reviewNumbers = [37, 42, 65, 21, 66, 28, 14, 18, 16, 22, 29, 34, 38]

const seedPropertyData = (num) => {
  let propertyString = `propertyId,propertyName,propertyOwner,numOfReviews,rating\n`;
  for (var i = 0; i < num; i++) {
    var property = {
      propertyId: zeroPad(i),
      propertyName: faker.address.streetAddress(),
      propertyOwner: faker.name.firstName(),
      numOfReviews: reviewNumbers[Math.floor(i/1000000)],
      rating: ((Math.random() * 5) + 3).toFixed(2),
    };
    propertyString += `${JSON.stringify(property)}\n`;
  }
  return new Promise((resolve,reject) => {
    fs.writeFile(`postgresspropertydata.csv`, propertyString, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  });
}

const seedUserData = (num) => {
  let userString = `userId,userName,profileImg\n`;
  for (var i = 0; i < num; i++) {
    var user = {
      userId: zeroPad(i),
      userName: faker.name.firstName(),
      profileImg: faker.image.imageUrl(),
    }
    userString += `${JSON.stringify(user)}\n`;
  }
  return new Promise((resolve,reject) => {
    fs.writeFile(`postgressuserdata.csv`, userString, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  });
}

const seedReviewData = (num) => {
  let reviewString = `reviewId,propertyId,userId,reviewDate,reviewComment\n`;
  for (var i = 0; i < num; i++) {
    var review = {
      reviewId: zeroPad(i),
      propertyId: zeroPad(faker.random.number()),
      userId: zeroPad(faker.random.number()),
      reviewDate: faker.date.past(),
      reviewComment: faker.lorem.sentences()
    }
    reviewString += `${JSON.stringify(review)}\n`;
  }
  return new Promise((resolve,reject) => {
    fs.writeFile(`postgressreviewdata.csv`, reviewString, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  });
}

// below is to seed 2 records

seedPropertyData(2);
seedUserData(2);
seedReviewData(2);

// const csvWriterProperty = createCsvWriter({
//   path: '/Users/berryblu/Desktop/assignment/exercise/reviews-section/database/postgres/postgrespropertydata.csv',
//   header: [
//       {id: 'propertyId', title: 'propertyId'},
//       {id: 'propertyName', title: 'propertyName'},
//       {id: 'propertyOwner', title: 'propertyOwner'},
//       {id: 'rating', title: 'rating'},
//       {id: 'numOfReviews', title: 'numOfReviews'},
//   ]
// });
// csvWriterProperty.writeRecords(propertyArray)       // returns a promise
//   .then(() => {console.log('success')})
//   .catch(() => {console.log('error', err)})

// const csvWriterUser = createCsvWriter({
//   path: '//Users/berryblu/Desktop/assignment/exercise/reviews-section/database/postgres/postgresuserdata.csv',
//   header: [
//       {id: 'userId', title: 'userId'},
//       {id: 'userName', title: 'userName'},
//       {id: 'profileImg', title: 'profileImg'},
//   ]
// });
// csvWriterUser.writeRecords(userArray)       // returns a promise
//   .then(() => {console.log('success')})
//   .catch(() => {console.log('error', err)})

// const csvWriterReview = createCsvWriter({
//   path: '/Users/berryblu/Desktop/assignment/exercise/reviews-section/database/postgres/postgresreviewdata.csv',
//   header: [
//       {id: 'reviewId', title: 'reviewId'},
//       {id: 'propertyId', title: 'propertyId'},
//       {id: 'userId', title: 'userId'},
//       {id: 'reviewDate', title: 'reviewDate'},
//       {id: 'reviewComment', title: 'reviewComment'},
//   ]
// });
// csvWriterReview.writeRecords(reviewArray)       // returns a promise
//   .then(() => {console.log('success')})
//   .catch(() => {console.log('error', err)})

// below is to seed 10M records

// write down the speed