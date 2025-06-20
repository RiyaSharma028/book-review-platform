import mongoose from "mongoose";
const {Schema} = mongoose;

const userScema = new Schema({
     fullname:{
        type: String,
        required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
  type: String,
  required: true,
  minlength: 6,    // Minimum 6 characters
},

}, {timestamps: true});


export  const User = mongoose.model("User", userScema);