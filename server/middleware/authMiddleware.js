const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.authorization = (req,res,next)=>{
    let token = req.headers['authorization'];
    jwt.verify(token , process.env.SECRET_KEY , (err , decoded)=>{
        if(err) throw createError('Not found user');
        req.user = {
            id:decoded.id,
            name:decoded.name,
            username:decoded.username,
            avatar:decoded.avatar,
            poster:decoded.poster,
            teacher:decoded.teacher
        }
        next();
    })
}


exports.guest = (req,res,next)=>{
    let token = req.headers['authorization'];
    jwt.verify(token , process.env.SECRET_KEY , (err , decoded)=>{
        if(err) throw createError('Not found user');
        next();
    })
}