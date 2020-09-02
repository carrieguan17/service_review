// references
const fs = require('fs');
const faker = require('faker');
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');

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

// ---------- using library ------------------

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

// ----------- old method --------------------
// var userArray = [];
// const seedUserData = (num) => {
//   let userString = `userId,userName,profileImg,reviewIds\n`;
//   for (var i = 0; i < num; i++) {
//     var user = {
//       userId: zeroPad(i),
//       userName: faker.name.firstName(),
//       profileImg: faker.image.imageUrl(),
//       reviewIds: []
//     }
//     userString += `${JSON.stringify(user)}\n`;
//     userArray.push(user)
//   }
//     return new Promise((resolve,reject) => {
//       fs.writeFile(`mongouserdata.csv`, userString, (err, data) => {
//         if(err) {
//           reject(err)
//         } else {
//           resolve(data)
//         }
//       })
//     });
// }

// var reviewNumbers = [37, 42, 65, 21, 66, 28, 14, 18, 16, 22, 29, 34, 38]

// const seedPropertyData = (num) => {
//   let propertyString = `propertyId,propertyName,propertyOwner,propertyOwnerImg,rating,numOfReviews,reviews\n`;
//   for (var i = 0; i < num; i++) {
//     var reviewsArray = [];
//     var numOfReviews = reviewNumbers[Math.floor(i/1000000)];
//     for (var j = 0; j < numOfReviews; j++) {
//       var review = {
//         reviewId: zeroPad(j + i * 50),
//         userId: zeroPad(faker.random.number()),
//         reviewDate: faker.date.past(),
//         reviewComment: faker.lorem.sentences()
//       };
//       reviewsArray.push(review);
//       for (var k = 0; k < userArray.length; k++) {
//         if (userArray[k].userId === review.userId) {
//           userArray[k].reviewIds.push(review.reviewId)
//         }
//       }
//     };
//     var property = {
//       propertyId: zeroPad(i),
//       propertyName: faker.address.streetAddress(),
//       propertyOwner: faker.name.firstName(),
//       propertyOwnerImg: faker.image.imageUrl(),
//       rating: ((Math.random() * 5) + 3).toFixed(2),
//       numOfReviews: numOfReviews,
//       reviews: reviewsArray
//     };
//     propertyString += `${JSON.stringify(property)}\n`;
//   }
//   return new Promise((resolve,reject) => {
//     fs.writeFile(`mongopropertydata.csv`, propertyString, (err, data) => {
//       if(err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   });
// }

// --------------- stream and drain --------------------

// write properties
// var userArray = [];
// for (var i = 0; i < 10000000; i++) {
//   var user = {
//     userId: zeroPad(i),
//     userName: faker.name.firstName(),
//     profileImg: faker.image.imageUrl(),
//     reviewIds: []
//   };
//   userArray.push(user)
// };

var reviewNumbers = [17, 12, 45, 16, 8, 4, 7, 6, 9, 5, 3];
var ratingNumbers = [4.62, 3.27, 3.96, 4.39, 4.23, 4.88]

const writeProperties = fs.createWriteStream('mongoproperties.csv');
writeProperties.write('propertyId,propertyName,propertyOwner,rating,numOfReviews,reviews\n', 'utf8');

const writeMProperties = (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      var reviewsArray = [];
      var numOfReviews = reviewNumbers[i%11];
      var reviews = '';
      for (var j = 0; j < numOfReviews; j++) {
        reviews += `{reviewId:${j + i * numOfReviews},userID:${faker.random.number()},reviewDate:${faker.date.past()},reviewComment:${faker.lorem.sentences()}},\n`
      };
      const propertyString = `${id},${faker.address.streetAddress()},${faker.name.firstName()},${ratingNumbers[i%6]},[${reviews}]\n`;
      if (i === 0) {
        writer.write(propertyString, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(propertyString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeMProperties(writeProperties, 'utf-8', () => {
  writeProperties.end();
});

// write users
// var imgUrl = [
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/ironman.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/45_million.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/elegance.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/beachhouse.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/petra.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/modernestate.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/malibu.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/belair.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/spectacular.jpg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/maliburesidence.jpeg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/hillsidevilla.jpeg",
//   "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/villapaullina.jpg",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/fallguys_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/skater_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/hellpoint_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/outerworlds_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/deathstranding_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/fallenorder_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/destroyhumans_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/tsushima_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/snowrunner_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/bugsbunny_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/phantommenace_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/goosebumps_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/lbpkarting_thumbnail.webp",
//   "https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/bioshock_thumbnail.webp"
// ]

// const writeUsers = fs.createWriteStream('mongousers.csv');
// writeUsers.write('userId,userName,profileImg,reviewIds\n', 'utf8');

// const writeTenMillionUsers = (writer, encoding, callback) => {
//   let i = 10000000;
//   let id = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       id += 1;
//       const userString = `${id},${faker.name.firstName()},${imgUrl[i%26]}\n`;
//       if (i === 0) {
//         writer.write(userString, encoding, callback);
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(userString, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
// write()
// }

// writeTenMillionUsers(writeUsers, 'utf-8', () => {
//   writeUsers.end();
// });

// below is to seed 2 records

// const used = process.memoryUsage().heapUsed / 1024 / 1024 ;
// console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

// mongoose.disconnect();

// below is to seed 10M records

// write down the speed



