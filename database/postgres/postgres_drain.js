const fs = require('fs');
const faker = require('faker');

// const zeroPad = (num) => {
//   return num.toString().padStart(9, "0");
// };

// var reviewNumbers = [17, 12, 45, 16, 8, 4, 7, 6, 9, 5, 3];
// var ratingNumbers = [4.62, 3.27, 3.96, 4.39, 4.23, 4.88]

// const writeProperties = fs.createWriteStream('postgresproperties.csv');
// writeProperties.write('propertyId,propertyName,propertyOwner,rating\n', 'utf8');

// const writeTenMillionProperties = (writer, encoding, callback) => {
//   let i = 10000000;
//   let id = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       id += 1;
//       const propertyString = `${id},${faker.address.streetAddress()},${faker.name.firstName()},${ratingNumbers[i%6]}\n`;
//       if (i === 0) {
//         writer.write(propertyString, encoding, callback);
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(propertyString, encoding);
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

// writeTenMillionProperties(writeProperties, 'utf-8', () => {
//   writeProperties.end();
// });

// // write users

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
// ];

// const writeUsers = fs.createWriteStream('postgresusers.csv');
// writeUsers.write('userId,userName,profileImg\n', 'utf8');

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

// write reviews

const writeReviews = fs.createWriteStream('postgresreviews.csv');
writeReviews.write('reviewId,propertyId,userId,reviewDate,reviewComment\n', 'utf8');

const writeTenMillionReviews = (writer, encoding, callback) => {
  let i = 50000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const reviewString = `${id},${faker.random.number()},${faker.random.number()},${faker.date.month()},${faker.lorem.sentences()}\n`;
      if (i === 0) {
        writer.write(reviewString, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(reviewString, encoding);
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

writeTenMillionReviews(writeReviews, 'utf-8', () => {
  writeReviews.end();
});