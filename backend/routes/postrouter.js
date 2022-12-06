const router = require("express").Router();
const { createPost, getPost, updatePost, deletePost, likePost, getTimeLine } = require('../controllers/postController.js')
 
//add new request
router.post('/', createPost);
 
//get a post
router.get('/:id',getPost);

//view all requests
// router.get('/',viewAllPosts);

// update request
router.put('/:id', updatePost);

//delete request
router.delete('/:id', deletePost);

//likes
router.put('/:id/like', likePost);

//likes
router.get('/:id/timeline', getTimeLine);
 
module.exports = router;