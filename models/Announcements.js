const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema ({
  title: {
    type: String,
    required : true
  },
  desc:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageURL: {
   originalname: String,
   filename: String,
   contentType: String
  } 
  });
module.exports = mongoose.model('announcements', AnnouncementSchema)