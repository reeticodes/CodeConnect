const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  profile: {
    ref: 'profile',
    type: Schema.Types.ObjectId
  },
  user: {
    ref: 'user',
    type: Schema.Types.ObjectId
  },

  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        ref:'user',
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref:'profile'
      },
      user: {
        type: Schema.Types.ObjectId,
        ref:'user'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      likes: [
        {
          user: {
            ref: 'user',
            type: Schema.Types.ObjectId
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);