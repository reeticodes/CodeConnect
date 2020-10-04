const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth')
const  Announcements = require('../../models/Announcements')
const User = require('../../models/User');

const connectDB = require('../../config/db')

const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);
const crypto = require('crypto')
const config = require('config');
const mongoURI = config.get('mongoURI');
const multer = require('multer');
const path = require('path')

//***************************************************************************************** */

// const conn = mongoose.connection;
//     let gfs;

//     conn.once('open', ()=>{
//       gfs = Grid(conn.db, mongoose.mongo);
//       gfs.collection;
//     })

//     const storage = new GridFsStorage({
//       url: mongoURI,
//       file: (req, file) =>{
//         return new Promise((resolve, reject) => {
//           crypto.randomBytes(16, (err,buf) => {
//             if(err) {
//               return reject(err);
//             }
//             const filename = buf.toString('hex') + path.extname(file.originalname);
//             const fileInfo = {
//               filename: filename,
//               bucketName : 'uploads'
//             };
//             resolve(fileInfo);
//           });
//         });
//       }
//     });
//     const upload = multer({storage})
  




//********************************************************* */



// router.post('/',[auth,[upload.single('imageURL')]],async(req,res)=>{
//   const errors = validationResult(req);
//   if(!errors.isEmpty()){
//     return res.status(400).json({errors: errors.array()})
//   }
//   try{
//     const admin =  await User.findById(req.user.id).select('-password');
//     if(admin.admin == false)
//     return res.status(400).send("Admin authentiction required")

//     const newAnnouncement = new Announcements({
//       title : req.body.title,
//       desc : req.body.desc,
//       imageURL : req.file
//     })

//     const announcement = await newAnnouncement.save();
//     res.json(announcement);

//   }
//   catch(err)
//   {   
//     console.error(err.message);
//     res.status(500).send('Server error')
//   }
// })

// router.post('/',auth,async(req,res)=>{
//   const errors = validationResult(req);
//   if(!errors.isEmpty()){
//     return res.status(400).json({errors: errors.array()})
//   }
//   try{
//     const admin =  await User.findById(req.user.id).select('-password');
//     if(admin.admin == false)
//     return res.status(400).send("Admin authentiction required")

//     const newAnnouncement = new Announcements({
//       title : req.body.title,
//       desc : req.body.desc,
//     })

//     const announcement = await newAnnouncement.save();
//     res.json(announcement);

//   }
//   catch(err)
//   {   
//     console.error(err.message);
//     res.status(500).send('Server error')
//   }
// })


// router.get('/', async(req,res)=>{
//   try {
//     const announcements  =  await Announcements.find().sort({date:-1});
//     res.json(announcements);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error')
//   }
// })

// router.get('/:id', async(req,res)=>{
//   try {
//     const announcement = await Announcements.findById(req.params.id);

//     if(!announcement)
//     return res.status(404).send("Announcement not found");

//     res.json(announcement);
    // gfs.findOne({filename: announcement.imageURL.filename}, (err,file)=>{
    //   if(err||!file)
    //   {
    //     return res.status(400).send("Not found");
    //   }
    // });
    // console.log(announcement.imageURL.filename)
    // gfs.createReadStream({filename: announcement.imageURL.filename}).pipe(res);
    
    

//   } catch (err) {
//     if(err.kind == 'ObjectId')
//     return res.status(404).send("Announcement not found");
//     console.error(err.message);
//     res.status(500).send('Server error!!');
//   }
// })



// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const announcement = await Announcements.findById(req.params.id)
//     if(!announcement){
//       return res.status(404).send("announcement not found");
//     }
//    const admin =  await User.findById(req.user.id).select('-password');
//     if(admin.admin == false)
//     return res.status(400).send("Admin authentiction required")
    
//     await announcement.remove();
//     res.json({msg:"announcement removed"})
    
    
//   } catch (err) {
//     if (err.kind === 'ObjectId')
//       return res.status(404).send("Post not found");
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });


module.exports = router;