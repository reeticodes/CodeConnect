const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth')
const  Announcements = require('../../models/Announcements')
const User = require('../../models/User');


router.post('/',auth,async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  try{
    const admin =  await User.findById(req.user.id).select('-password');
    if(admin.admin== false)
    return res.status(400).send("Admin authentiction required")

    const newAnnouncement = new Announcements({
      title : req.body.title,
      desc : req.body.desc,
      imageURL : req.file.imageURL
    })

    const announcement = await newAnnouncement.save();
    res.json(announcement);

  }
  catch(err)
  {   
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

router.get('/', async(req,res)=>{
  try {
    const announcements  =  await Announcements.find().sort({date:-1});
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

module.exports = router;