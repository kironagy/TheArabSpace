// import express
const express = require('express');
//import Router in express
const router= express.Router();
//  authMiddleware
const auth = require('../middleware/authMiddleware')
// controller
const controller = require('../controller/authController');
//import multer 
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../client/public/img_users')
    },
    filename:(req,file,cb)=>{
        const fileName = `${Date.now()}_${Math.random()*1000}_.png`
        cb(null,fileName);
    }
})

const upload = multer({storage}).single('src')


//Router register user
router.post('/register',controller.create);
// Router Login user
router.post('/login',controller.login);

//remember password
router.post('/remember',controller.remember);
//get user data
router.get('/profile/:id',auth.authorization,controller.details);

router.post('/profile/avatar',auth.authorization,upload,controller.avatar);


router.get('/me',auth.authorization , controller.me);
//export router
module.exports = router;