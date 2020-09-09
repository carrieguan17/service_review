const mongoose = require('mongoose')

// This is to define the property schema
let propertySchema = new mongoose.Schema({
  propertyId: Number,
  propertyName: String,
  rating: Number,
  numOfReviews: Number,
  reviews: [reviewSchema]
});

// This is to define the user schema
let userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  profileImg: String
});

// This is to define the review schema
let reviewSchema = new mongoose.Schema({
  reviewId: String,
  propertyId: String,
  user: userSchema,
  reviewDate: Date,
  reviewComment: String
})

module.exports = {
  propertySchema: propertySchema,
  userSchema: userSchema
}