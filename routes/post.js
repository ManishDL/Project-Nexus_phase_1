const mongoose = require('mongoose');


// Define the Post schema
const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true
  },
  image:{
    type:String
  },
  user:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
