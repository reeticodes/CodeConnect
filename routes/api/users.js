const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');
const User = require('../../models/User');
const config = require('config');
const Avatars = require('@dicebear/avatars').default;
const sprites = require('@dicebear/avatars-bottts-sprites').default






//@route    POST api/users
//@desc     Register user
//@access   Public
router.post('/',[
  check('email','Please include a valid email').isEmail().custom(val =>
    {
    const regex = /@nhitm.ac.in\s*$/;
    return regex.test(val);
    } ),
  check('password','Please enter a password with 6 or more characters').isLength({min : 6})

],async (req,res) => {
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
    const {  email, password } = req.body;

    try {

  //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
  //Get users gravatar
  // avatar = gravatar.url(email, {
  //       s: '200',
  //       r: 'pg',
  //       d: 'mm'
  //     })
      // let options = {};
      // let avatars = new Avatars(sprites, options);
      // let avatar = new avatars(sprites(options))




      

      //x
      user = new User({
        email,
        password
      });
      if(email ==  'reetisharma192@nhitm.ac.in'|| email == 'harshkarande192@nhitm.ac.in')
      admin = true;
      else 
      admin = false;

  //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: { 
          id: user.id
        }
      }
  //Return jsonwebtoken
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      // res.send('User Registered');
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server error')
    }

  
})

module.exports = router;