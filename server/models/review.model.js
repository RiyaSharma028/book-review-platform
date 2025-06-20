import mongoose from "mongoose";
const {Schema } = mongoose;

const ReviewSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId, // Linking to a Book
    ref: "Book",
    required: true
  },
  userName: String,         // Who wrote the review
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String,          // Review content
  createdAt: {
    type: Date,
    default: Date.now       // Automatically set when review is created
  }
});


export const Review = mongoose.model("Review" , ReviewSchema);