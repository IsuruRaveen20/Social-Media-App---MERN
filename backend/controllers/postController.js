const PostModel = require("../models/PostModel");
const User = require("../models/User");
const mongoose = require('mongoose');

//add new doc
exports.createPost = async (req, res) => {
 
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch(error) {
    res.status(500).json({message:"Fail to send request",error:error.message})
  }
  
  }
  
  //Get a post
  exports.getPost = async (req, res) => {
    const postId = req.params.id;

    try{
      const post = await PostModel.findById(postId);
      res.status(200).json({post});
    } catch (error) {
      res.status.json(error);
    }

  }
  
  //view Requests
  // exports.viewAllPosts = async (req, res) => {
   
  //   //calling model
  //   PostModel.find().then((request) => {
  //     res.status(200).json(request)
  //   }).catch((error) => {
  //     res.status(500).json({ message: "Error with fetching details", error: error.message });
  //   })
  // }
   

  exports.updatePost = async(req,res) => {

    let postId = req.params.id;
    const { userId } = req.body;
    
    try{
      const post = await PostModel.findById(postId);
      if(post.userId === userId){
          await post.updateOne({$set: req.body});
          res.status(200).json({message:"post updated!"})
      } else{
        res.status(403).json("Action Forbidden!")
      }
    } catch(error){
        res.status(500).json({message:"Error with updating details",error:error.message});
    }

}

//delete existing request
exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const {userId} = req.body;

  try{
    const post = await PostModel.findById(postId);
    if(post.userId === userId) {
      await post.deleteOne();
      res.status(200).json({ status: "Post Deleted" });
    }else {
      res.status(403).json("Action Forbidden!")
    }
  } catch(error){
    res.status(500).json({ status: "Error with Deleting Request", error: error.message });
  }
}
  
//like and dislike
exports.likePost = async (req, res) => {
  const postId = req.params.id;
  const {userId} = req.body;

  try{
    const post = await PostModel.findById(postId);
    if(!post.likes.includes(userId)) {
      await post.updateOne({$push: {likes: userId}});
      res.status(200).json({ status: "Post Liked" });
    }else {
      await post.updateOne({$pull: {likes: userId}});
      res.status(200).json({ status: "Post Un Liked" });
    }
  } catch(error){
    res.status(500).json({ status: "Error with Like", error: error.message });
  }
}


//get timeline
exports.getTimeLine = async (req, res) => {
  const userId = req.params.id;

  try{
    //get the data
    const currentUserPosts = await PostModel.find({userId: userId});

    // aggregate = steps => pipeline
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id : new mongoose.Types.ObjectId(userId)
        }
      },        
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts"
        }
      },
      {
        $project: {
          followingPosts : 1,
          _id: 0
        }
      }
    ])
    
    res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts)
    .sort((a,b)=>{
      return b.createdAt - a.createdAt;
    }));

  } catch(error){
    res.status(500).json({ status: "Error with Timeline", error: error.message });
  }
}
  