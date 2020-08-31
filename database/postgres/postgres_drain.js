const fs = require('fs');
const faker = require('faker');

const zeroPad = (num) => {
  return num.toString().padStart(9, "0");
};

var reviewNumbers = [37, 42, 65, 21, 66, 28, 14, 18, 16, 22, 29, 34, 38];

const writeProperties = fs.createWriteStream('postgresproperties.csv');
writeProperties.write('propertyId,propertyName,propertyOwner,numOfReviews,rating\n', 'utf8');

const writeTenMillionProperties = (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      var property = {
        propertyId: zeroPad(id),
        propertyName: faker.address.streetAddress(),
        propertyOwner: faker.name.firstName(),
        numOfReviews: reviewNumbers[Math.floor(i/1000000)],
        rating: ((Math.random() * 5) + 3).toFixed(2),
      };
      const propertyString = `${JSON.stringify(property)}\n`;
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

writeTenMillionProperties(writeProperties, 'utf-8', () => {
  writeProperties.end();
});

// write users
const writeUsers = fs.createWriteStream('postgresusers.csv');
writeUsers.write('userId,userName,profileImg\n', 'utf8');

const writeTenMillionUsers = (writer, encoding, callback) => {
  let i = 10000000;
  let index = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      var user = {
        userId: zeroPad(id),
        userName: faker.name.firstName(),
        profileImg: faker.image.imageUrl(),
      };
      const userString = `${JSON.stringify(user)}\n`;
      if (i === 0) {
        writer.write(userString, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(userString, encoding);
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

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});

// write reviews

const writeReviews = fs.createWriteStream('postgresreviews.csv');
writeReviews.write('reviewId,propertyId,userId,reviewDate,reviewComment\n', 'utf8');

const writeTenMillionReviews = (writer, encoding, callback) => {
  let i = 10000000;
  let index = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      var review = {
        reviewId: zeroPad(i),
        propertyId: zeroPad(faker.random.number()),
        userId: zeroPad(faker.random.number()),
        reviewDate: faker.date.past(),
        reviewComment: faker.lorem.sentences()
      };
      const reviewString = `${JSON.stringify(review)}\n`;
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