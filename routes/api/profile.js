const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const got = require('got');
const config = require('config');
const axios = require('axios')

const Profile = require('../../models/Profile');
const Post = require('../../models/Posts')
const User = require('../../models/User');

const { check, validationResult } = require('express-validator');

const normalize = require('normalize-url');

//@route GET api/profile/me
//@desc Test route
//@access Public
router.get('/me',auth,async (req,res) => {
  try{
    
    const profile = await Profile.findOne({user : req.user.id}).populate('user');

    if(!profile){
      return res.status(400).json({msg : 'There is no profile for this user'});
    }
    res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});



//@route POST api/profile
//@desc Create or update profile
//@access private
router.post('/', [auth, [
  check('name', 'name required').not().isEmpty(),
  check('status','status required').not().isEmpty(),
  check('skills','skills required').not().isEmpty()
]],async (req,res) => {
// console.log(req.body);
const errors =validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors: errors.array()});
}
    const {
      name,avatar,
      company, website, location, bio, status, githubusername, skills,
      youtube, facebook, twitter, instagram, linkedin
    } = req.body;
    //Build profile object
    const profileFields = {};
    
    
    profileFields.user = req.user.id;
    if(name) profileFields.name = name;
    if (company) profileFields.company = company;
    if (website) profileFields.website = normalize(website, {forceHttps: true});
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.toString().split(',').map((skill) => ' ' + skill.trim()+ ' ');
    }
    const user = await User.findById(req.user.id).select('-password');
    
      profileFields.avatar = `https://avatars.dicebear.com/api/bottts/${user._id}.svg`;
  
    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try{
      let profile =await Profile.findOne({user : req.user.id})

      if(profile){
        //Update
        profile = await Profile.findOneAndUpdate({user: req.user.id},
          {$set: profileFields},
          {new: true, upsert: true, setDefaultsOnInsert: true }
          );
          return res.json(profile)
      }

       //Create 
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile)

    }catch(err){
      console.error(err.message);
      res.status(500).send('Server error!')
    }
});




//@route  GET api/profile
//@desc   Get all profiles
//@access Public
router.get('/',async(req,res) => {
  try {
    const profiles = await Profile.find().populate('user');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!')
    
  }
});



//@route    GET api/profile/user/:user_id
//@desc     Get  profile by user id
//@access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    console.log("im hit dude2")
    const profile = await Profile.findOne(
        {user: req.params.user_id}
      ).populate('user');

    if(!profile){
      return res.status(400).json({ msg: "Profile not found"})
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Profile not found" });
      else
      res.status(500).send('Server error!');

  }
});


//@route    PUT api/profiles/search
//@desc     Filter by search
//@access   Public

router.get('/filter', async (req,res)=>{
  try {
    const profiles = await Profile.find({ name: {$regex: req.query.name, $options:'i'} }).populate('user');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!')
  }
})











//@route    DElete api/profile
//@desc     Delete profile, user and posts
//@access   Private

router.delete('/',auth,async(req,res) =>{
  try {

    const myprofile = await Profile.findOne({ user: req.user.id });
    let myfollowers = myprofile.followers;
    let myfollowing = myprofile.following;
    //console.log(`FOLLOWERS: ${myfollowers} ------------------------------------------- FOLLOWING : ${myfollowing}`)
    for(let i=0;i<myfollowers.length;i++)
    {
      const userprofile = await Profile.findOne({user: myfollowers[i].user});
      userprofile.following = userprofile.following.filter(({user})=> user.toString()!= req.user.id);
      await userprofile.save();
    }

      for(let i=0;i<myfollowing.length;i++)
    {
      const userprofile = await Profile.findOne({user: myfollowing[i].user});
      userprofile.followers = userprofile.followers.filter(({user})=> user.toString()!= req.user.id);
      await userprofile.save();
    }


     // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error")
  }
});



//@route    PUT api/profile
//@desc     Add profile experience
//@access   Private
router.put('/experience',[auth,
[
  check('title','title is required').not().isEmpty(),
  check('company','company is required').not().isEmpty(),
  check('from','From date is required').not().isEmpty()
]], async (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const{
    title,company,location,from,to,description,current
  } = req.body;

  const newExp = {
    title, company, location, from, to, description,current
  }

  try {
    let profile = await Profile.findOne({user: req.user.id});
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



//@route    DELETE api/profile
//@desc     delete profile experience
//@access   Private
router.delete('/experience/:exp_id',auth, async (req,res)=>{
  try {
    //Get the remove index
    const profile = await Profile.findOne({user: req.user.id})
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

//@route    PUT api/profile
//@desc     Add profile education
//@access   Private
router.put('/education', [auth,
  [
    check('school', 'school is required').not().isEmpty(),
    check('jrcollege', 'Junior college is required').not().isEmpty(),
    check('branch', 'Branch is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('admyear', 'From date is required').not().isEmpty()
  ]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      school, jrcollege, branch, year, admyear
    } = req.body;

    const newEdu = {
      school, jrcollege, branch, year, admyear
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });



//@route    DELETE api/profile
//@desc     delete profile education
//@access   Private
router.delete('/education/:exp_id', auth, async (req, res) => {
  try {
    //Get the remove index
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.education
    .map(item => item.id)
    .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});




//@route    GET api/profile/github/:username
//@desc     get user repos from github
//@access   Public


router.get('/github/:username', async (req, res) => {
  try {
    // const uri = encodeURI(
    //   `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    // );
    // const headers = {
    //   'user-agent': 'node.js',
    //   Authorization: `token ${config.get('githubToken')}`
    // };

    // const gitHubResponse = await axios.get(uri, { headers });
    // return res.json(gitHubResponse.data);
    const rest = await axios.get(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`);
    return res.json(rest.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});


















//@route    GET api/profile/user/:user_id
//@desc     Get  profile by user id
//@access   Public
router.get('/user/:user_id/posts',auth, async (req, res) => {
  try {
     const user = await User.findById(req.user.id).select('-password');
    const profile = await Profile.findOne(
      { user: req.params.user_id }
    ).populate('user');
    const posts = await Post.find({ 'name': profile.name });
    if (!posts) {
      return res.status(404).send("Post not found")
    }else
    res.json(posts);

    
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Posts not found" });
    else
      res.status(500).send('Server error!');

  }
});






//********************************************************************************* */



//@route    GET api/profile/followuser/:user_id
//@desc     Follow user
//@access   Private
router.put('/followuser/:user_id',auth, async (req, res) => {
  try {
  
    const profile = await Profile.findOne(
      { user: req.params.user_id }
    )
    const myprofile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" })
    }
  
    //Check if the user is already followed
    if(profile.followers.filter(follow=>follow.user.toString()==req.user.id).length>0)
    {

      return res.status(404).json({ msg: 'User already followed' })
    }
    

    profile.followers.unshift({user : req.user.id});
    myprofile.following.unshift({user:req.params.user_id});

    await profile.save();
    await myprofile.save();
    res.json(`${profile} ------------------ ${myprofile}`);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Profile not found" });
    else
      res.status(500).send('Server error!');
  }
});






//@route    GET api/profile/unfollowuser/:user_id
//@desc     unfollow user
//@access   Private
router.put('/unfollowuser/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne(
      { user: req.params.user_id }
    ).populate('user');
    const myprofile = await Profile.findOne({ user: req.user.id }).populate('user');

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" })
    }

    //Check if the user is already followed
    if (profile.followers.filter(follow => follow.user.toString() == req.user.id).length === 0) {

      return res.status(404).json({ msg: 'User not followed' })
    }

    //Get remove index
    profile.followers = profile.followers.filter(
      ({user})=> user.toString()!==req.user.id
    )
    myprofile.following = myprofile.following.filter(
      ({user}) => user.toString()!== req.params.user_id
      )

    await profile.save();
    await myprofile.save();

    res.json(`Unfollowed!`);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Profile not found" });
    else
      res.status(500).send('Server error!');
  }
});



//@route    GET api/profile/unfollowuser/:user_id
//@desc     Get Followers
//@access   Public
router.get('/followers/:user_id', async (req,res)=>{

  try {
    console.log('im in')
    const profile = await Profile.findOne({user: req.params.user_id})
    
    //const x = await Profile.findOne({ user: profile.followers[0].user })
    const profiles=[];
    for(let i=0;i<profile.followers.length;i++)
    {
      profiles[i] =  (await Profile.findOne({ user: profile.followers[i].user })).populate('user')
    }
    //console.log(profile.followers[0].user)
    res.json(profiles)
    //const folllowers = profile.folllowers.map(x => console.log(x))
    // console.log(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/following/:user_id', async (req, res) => {

  try {
    console.log('im in')
    const profile = await Profile.findOne({ user: req.params.user_id })
    const profiles = [];
    for (let i = 0; i < profile.following.length; i++) {
      profiles[i] = await Profile.findOne({ user: profile.following[i].user }).populate('user')
    }
    res.json(profiles)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



//********************************************************************************* */










module.exports = router;