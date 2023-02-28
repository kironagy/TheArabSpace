require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// import My library
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post')
const lessonRouter = require('./routes/lesson')

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// use App
app.use('/api',authRouter);
app.use('/post',postRouter);
app.use('/lessons',lessonRouter);



app.use((req,res,next)=>{
    res.status(404).json({message:"Not Found"});
    next();
})


app.use((err,req,res,next)=>{
    if(err.name === 'MongoError' || err.name === 'ValidationError' || err.name == 'CastError'){
        err.status = 422;
    }
    res.status(err.status || 500).json({message:err.message || ""})
})





MongoClient.connect('mongodb://localhost:27017/theArab' , {useNewUrlParser:true , family:4} , err =>{
    if(err) throw err;
    console.log('mongodb connect')
})

module.exports = app;
