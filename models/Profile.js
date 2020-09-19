const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String
  },
  codeforcesusername:{
    type: String
  },
  profilePic: {
    data: Buffer, 
    contentType: String
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      jrcollege: {
        type: String,
        required: true
      },
      branch: {
        type: String,
        required: true
      },
      year: {
        type: Date,
        required: true
      },
      admyear: {
        type: Date,
        required: true
      },
    }
  ],
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
  },
  date: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  image: String
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);