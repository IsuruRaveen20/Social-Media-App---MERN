const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const sendEmail = require("../utils/sendEmail")

//user sign in controller
exports.usersignin = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password)
        return res.status(400).json({ message: "Please provide an email and password" });

    try {
        //finding user by email
        const user = await User.findOne({ email }).select("+password");

        //if user doesn't exist
        if (!user)
            return res.status(404).json({ message: "User doesn't exist" });

        //compare the provided password with the password in the database
        const ispasswordCorrect = await bcrypt.compare(password, user.password);

        //if passwords don't match
        if (!ispasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        //creating a token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        //sending the user object and token as the response
        res.status(200).json({ success: true, result: user, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

//user sign up controller
exports.usersignup = async (req, res) => {
    const { firstname, lastname, email, phone, password, imgUrl } = req.body;

    try {
        //checking email already exists
        const checkEmail = await User.findOne({ email })

        if (checkEmail)
            return res.status(409).json({ message: "User with this email already exists" })

        //creating a new user
        const user = await User.create({ firstname, lastname, email, phone, password, imgUrl });

        //creating a token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        //sending the user object and token as the response
        res.status(200).json({ success: true, result: user, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

//update user controller
exports.updateUser = async (req, res) => {
    let userID = req.params.id;

    const {_id, currentUserAdminStatus, password} = req.body;


    if(userID===_id){
        try {

            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password,salt);
            }

            //find user by userID and update the user with provided data
            const user = await User.findByIdAndUpdate(userID, req.body, {new:true})
    
            // update token
            const token = jwt.sign(
                {email:user.email, id:user._id}, 
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
            )

            //sending the status message successful
            res.status(200).json({ success: true, message: "Profile updated successfully",result: user,token })
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    } else{
        res.status(403).json("Access Denied! You can access to your own profile!");
    }
}

//delete user controller
exports.deleteUser = async (req, res) => {
    const userID = req.params.id;

    const {currentUserId,currentUserAdminStatus} = req.body;

    if(currentUserId === userID || currentUserAdminStatus) {
        try {
            //find user by userID and delete it
            await User.findByIdAndDelete(userID);
    
            //sending the status message successful
            res.status(200).json({ success: true, message: "User deleted!" })
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    } else {
        res.status(403).json("Access Denied! You can delete own profile!");
    }
}

//fetch users controller
exports.fetchAll = async (req, res) => {

    //calling User model
    User.find().then((user) => {
        res.status(200).json(user)
      }).catch((error) => {
        res.status(500).json({ message: "Error with fetching users", error: error.message });
      })
}

//fetch one user controller
exports.fetchOne = async (req, res) => {
    let user = await User.findById(req.params.id)
    try {
        if(user){
            const {password, ...otherDetails} = user._doc;

            res.status(200).json({ success: true, result: otherDetails })
        } else {
            res.status(404).json("No such a user!")
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

// Follow a user
exports.followUser = async (req, res) => {
    const userId = req.params.id;

    const {currentUserId} = req.body;

    if(currentUserId === userId){
        res.status(200).json({ success: true, message: "Action Denied!"})
    } else {
        try {
                const followUser = await User.findById(userId);
                const followingUser = await User.findById(currentUserId);

                if(!followUser.followers.includes(currentUserId)){
                    await followUser.updateOne({$push : {followers: currentUserId}});
                    await followingUser.updateOne({$push : {following: userId}});
                    res.status(200).json({ success: true, message: "User Followed!"});
                } else {
                    res.status(403).json("User is already followed by you!")
                }

        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    }
}

// UnFollow a user
exports.unFollowUser = async (req, res) => {
    const userId = req.params.id;

    const {currentUserId} = req.body;

    if(currentUserId === userId){
        res.status(200).json({ success: true, message: "Action Denied!"})
    } else {
        try {
                const followUser = await User.findById(userId);
                const followingUser = await User.findById(currentUserId);

                if(followUser.followers.includes(currentUserId)){
                    await followUser.updateOne({$pull : {followers: currentUserId}});
                    await followingUser.updateOne({$pull : {following: userId}});
                    res.status(200).json({ success: true, message: "User Unfollowed!"});
                } else {
                    res.status(403).json("User is not followed by you!")
                }

        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    }
}

// get All users
exports.getUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const {password,...otherDetails} = user._doc
            return otherDetails
        })
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}
