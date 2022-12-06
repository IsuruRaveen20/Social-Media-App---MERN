const router = require("express").Router();
const userauth = require('../middleware/userauth');
const { usersignup, usersignin, updateUser, deleteUser, followUser, unFollowUser, getUsers } = require('../controllers/usercontroller.js');
const { fetchAll, fetchOne } = require('../controllers/usercontroller.js');



//user sign up
router.post('/signup', usersignup);

//user sign in
router.post('/signin', usersignin);

//user update profile
router.put('/:id', updateUser);

//user delete profile
router.delete('/:id', deleteUser);

//find all users
router.get('/view', fetchAll);

//find one user
router.get('/:id', fetchOne);

//follow user
router.put('/:id/follow', followUser);

//follow user
router.put('/:id/unfollow', unFollowUser);

// users
router.get('/', getUsers);


module.exports = router;