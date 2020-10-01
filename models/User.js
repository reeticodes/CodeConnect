const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  email : {
    type : String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  admin:{
    type: Boolean,
    default: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  date : {
    type : Date,
    default : Date.now
  }
});
module.exports = User = mongoose.model('user', UserSchema);