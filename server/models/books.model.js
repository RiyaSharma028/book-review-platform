import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  genre: String,
  description: String,
  coverImage: String,

} , {timestamps : true} );

export  const Book = mongoose.model("Book", BookSchema);
