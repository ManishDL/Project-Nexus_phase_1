const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")
// mongoose.connect("mongodb+srv://manishlawhale02:Manish123@cluster0.hak3dx3.mongodb.net/?retryWrites=true&w=majority")
// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique:true
  },
  password: {
    type: String
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  dp: {
    type: String, // Assuming dp is a URL to the user's profile picture
    default: 'default_profile_picture_url.jpg' // You can set a default URL if needed
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
  }
});

// Create the User model
userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);

