const mongoose = require('mongoose')

// This is to define the property schema
let propertySchema = new mongoose.Schema({
  propertyId: String,
  propertyName: String,
  propertyOwner: String,
  propertyOwnerImg: String,
  rating: Number,
  numOfReviews: Number,
  reviews: [{
    reviewId: String,
    userId: String,
    reviewDate: Date,
    reviewComment: String,
    // response: {
    //   resDate: Date,
    //   resComment: String
    // }
  }]
});

// This is to define the user schema
let userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  profileImg: String,
  reviewIds: []
});

module.exports = {
  propertySchema: propertySchema,
  userSchema: userSchema
}