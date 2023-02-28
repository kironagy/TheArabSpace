//import User model
const User = require('../model/user');
const createError = require('http-errors');
const jwt = require('jsonwebtoken')
//Register User
exports.create = (req,res,next)=>
{
    let data={
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        password2:req.body.password2,
        avatar:'avatar.png',
        poster:'poster.png'
    }
    User.create(data)
    .then(user =>{
        if(user.username === 'Admin@gmail.com'){
            user.teacher = true;
            return user.save().then(user =>{
                let data ={
                    id:user._id,
                    name:user.name,
                    username:user.username,
                    avatar:user.avatar,
                    poster:user.poster,
                    teacher:user.teacher
                }
                let token = jwt.sign(data , process.env.SECRET_KEY)
                res.json({token:token , id:user._id})
            });
        }else{
            let data ={
                id:user._id,
                name:user.name,
                username:user.username,
                avatar:user.avatar,
                poster:user.poster,
                teacher:user.teacher
            }
            let token = jwt.sign(data , process.env.SECRET_KEY)
            res.json({token:token , id:user._id})
        }
     
    })

    .catch(err =>{
        if(err.name='E11000') throw createError("هذا الحساب مستخدم بالفعل")
        if(err) throw createError('هناك خطأ يرجي المحاوله في وقت اخر')
      
    })
    .catch(next)
}
//Login User
exports.login = (req,res,next)=>
{
    let {username , password} = req.body;
    User.findOne({username , password})
    .then(user =>{
        if(!user) throw createError(401,'البريد الالكتروني او كلمه المرور غير صحيحه' ) ;
        res.json(user.getJwt());
    })
    .catch(next)
}
//get  user data
exports.details = (req,res,next)=>{

    User.findById(req.params.id)
    .then(user =>{
        res.json(user)
    })
    .catch(next)
}

exports.me = (req,res,next)=>{
    res.json(req.user)
}

exports.remember = (req,res,next)=>{
    let {username , password2} = req.body;
    User.findOne({username , password2})
    .then(user =>{
        if(!user)throw createError(401,'البريد الالكتروني او كلمه المرور غير صحيحه' ) ;
        res.json({password:user.password})
    })
    .catch(err =>{
        if(err) throw err
    })
    .catch(next)
}

exports.avatar = (req,res,next)=>{
    User.findById(req.user.id)
    .then(user =>{
        user.avatar = req.file.filename
        return user.save();
    })
    .catch(next)
}
