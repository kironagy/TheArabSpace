const express = require('express');
const router = express.Router();
const controller = require('../controller/lessonController');
const auth = require('../middleware/authMiddleware')
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../client/public/img_lessons')
    },
    filename:(req,file,cb)=>{
        const fileName = `${Date.now()}_${Math.random()*1000}_${file.originalname.replace(' ','')}`
        cb(null,fileName);
    }
})

const upload = multer({storage}).single('src')
//Creaet a new lesson
router.post('/create',auth.authorization,upload,controller.create);
//Get all Lessons
router.get('/',controller.list);
// Show Details Lesson
router.get('/show/:id',controller.details);

module.exports = router;