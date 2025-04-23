const express = require('express');
const { loginUser } = require('../controller/login');
const { registerUser } = require('../controller/register');
const { updateProfile, getUserDetails } = require('../controller/updateProfile');
const checkUserAuthenticated = require('../middleWare/checkUserAuthenticated');


const multerUpload = require('../middleWare/multerUpload');

const router = express.Router();

// Routes
router.post('/login', loginUser);
router.post('/register', multerUpload.single('profilePicture'), registerUser);
router.put('/updateProfile', checkUserAuthenticated, multerUpload.single('profilePicture'), updateProfile);
router.get('/getUserDetails', checkUserAuthenticated, getUserDetails);


module.exports = router;
