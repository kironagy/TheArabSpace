const Lesson = require('../model/lessonse');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
// Create a new lesson
exports.create = (req,res,next)=>{
    let data ={
        title:req.body.title,
        content:req.body.content,
        src:req.file.filename,
        author:req.user.id
    }
    Lesson.create(data)
    .then(lesson =>{
        res.json(lesson);
    })
    .catch(next)
}
// Get all lessonse
exports.list = (req,res,next)=>{
    Lesson.find()
    .then(lesson =>{
        res.json(lesson);
    })
    .catch(next)
}

// Get Details Lesson
exports.details = (req,res,next)=>
{
    Lesson.findById(req.params.id)
    .populate('author','name avatar username _id')
    .then(lesson =>{
        res.json(lesson)
    })
    .catch(next)
}