// import express
const express = require('express');
//import Router in express
const router= express.Router();
//  authMiddleware
const auth = require('../middleware/authMiddleware')
// controller
const controller = require('../controller/postController');

//create a new post
router.post('/create',auth.authorization,controller.create);

//get all posts
router.get('/',controller.list);

// get details post
router.get('/show/:id',controller.details);


router.patch('/show/:id',controller.delete);


router.post('/show/:id',auth.authorization,controller.comment);

router.put('/show/:id',auth.authorization,controller.like);

router.delete('/show/:id',auth.authorization,controller.unlike);


module.exports = router;