const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth')

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Posts = require('../../models/Posts');
const Announcements = require('../../models/Announcements')
const { route } = require('./auth');
//@route POST api/posts
//@desc Create a post 
//@access Private
router.post('/',[auth,[
  check('text','Text is required').not().isEmpty()
]], async(req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
  
      const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user');

    const newPost = new Posts({
      text: req.body.text,
      name : profile.name,
      avatar: profile.avatar,
      user: req.user.id
    })
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
    
  }
);


//@route  GET api/posts
//@desc   Get all posts 
//@access Private
router.get('/',async(req,res)=>{
  try {
    const posts = await Posts.find().sort({date : -1});
    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});



//@route  GET api/posts/:id
//@desc   Get posts by id
//@access Private
router.get('/postId/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    //.sort({ date: -1 });
    if(!post){
      return res.status(404).send("Post not found")
    }
    res.json(post)
  } catch (err) {
    if (err.kind==='ObjectId') 
      return res.status(404).send("Post not found");
    console.error(err.message);
    res.status(500).send('Server error!!');
  
}
});




//@route  DELETE api/posts/:id
//@desc   Delete a post
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    if(!post){
      return res.status(404).send("Post not found");
    }
    //Check user
    if(post.user.toString()!== req.user.id)
    return res.status(401).json({msg:"User Not Authorised"});
    
    await post.remove();
    res.json({msg:"Post removed"})
    
    
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).send("Post not found");
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



//@route  PUT api/posts/like/:id
//@desc   Like a post
//@access Private
router.put('/like/:id',auth,async (req,res)=>{
  try{
    const post = await Posts.findById(req.params.id);

    //Check if the post has already been liked
    if(post.likes.filter(like=>like.user.toString()===req.user.id).length > 0 ){
      return res.status(404).json({msg : 'Post already liked'})
    }

      post.likes.unshift({user: req.user.id });

      await post.save();

      res.json(post.likes);
    
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
});


//@route  PUT api/posts/unlike/:id
//@desc   unlike a post
//@access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    //Check if the post has already been liked
    if (post.likes.some(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(404).json({ msg: 'Post has not yet been liked' })
    }

    //Get remove index
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    

    await post.save();

    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});



//@route POST api/posts/comment/:id
//@desc Comment on a post
//@access Private
router.post('/comment/:id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const post = await Posts.findById(req.params.id);
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user');
    const newComment = {
      text: req.body.text,
      name: profile.name,
      avatar: profile.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }

}
);


//******************************************************************************* */
//@route  PUT api/posts/like/:id
//@desc   Like comment on a post
//@access Private
router.put('/commentlike/:id/like/:comment_id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    //Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id)

    //Check if the post has already been liked
    if (comment.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(404).json({ msg: 'Post already liked' })
    }

    comment.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(comment.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});


//@route  PUT api/posts/unlike/:id
//@desc   unlike a post
//@access Private
router.put('/commentunlike/:id/unlike/:comment_id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    //Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id)

    
    //Check if the post has already been liked
    if (comment.likes.some(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(404).json({ msg: 'Post has not yet been liked' })
    }

    //Get remove index
    comment.likes = comment.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    res.json(comment.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});



//******************************************************************************* */


//@route DELETE api/posts/comment/:id/:comment_id
//@desc delete a Comment on a post
//@access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const post = await Posts.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find(comment=>comment.id===req.params.comment_id)

    //Make sure  comment exists
    if(!comment)
    return res.status(404).json({msg: "comment not found"});

    //Check user
    if(comment.user.toString()!== req.user.id){
      res.status(401).json({msg: "user not authorised"})
    }

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }

}
);
////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getannouncements', async (req, res) => {
  try {
    console.log("im hit dude1")
    const announcements = await Announcements.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
router.delete('/announcements/:id', auth, async (req, res) => {
  try {
    console.log('delete me is hit')
    const announcement = await Announcements.findById(req.params.id)
    if (!announcement) {
      return res.status(404).send("announcement not found");
    }
    const admin = await User.findById(req.user.id).select('-password');
    if (admin.admin === false)
      return res.status(400).send("Admin authentiction required")

    await announcement.remove();
    res.json({ msg: "announcement removed" })


  } catch (err) {
    console.log(err);
    if (err.kind === 'ObjectId')
      return res.status(404).send("ann not found");
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



router.post('/announcements', [auth,[
  check('title', 'Title is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const admin = await User.findById(req.user.id).select('-password');
    if (admin.admin === false)
      return res.status(400).send("Admin authentiction required")

    const newAnnouncement = new Announcements({
      title: req.body.title,
      desc: req.body.desc,
    })

    const announcement = await newAnnouncement.save();
    res.json(announcement);

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
module.exports = router;