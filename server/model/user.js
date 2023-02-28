//import Mongoose Db
const mongoose = require('mongoose');
//import Schema in mongoose
const Schema = mongoose.Schema;
//import jsonwebtokn
const jwt = require('jsonwebtoken');

const createError = require('http-errors');
// Create User Schema
const userSchema = new Schema
({
    name:
    {
        type:String,
        required:true,
        minLength:4,
        maxLength:30,
        unique:true
    },
    username:
    {
        type:String,
        required:true,
        unique:true,
        minLength:7,
        maxLength:40
    },
    password:
    {
        type:String,
        required:true,
    },
    password2:{
        type:String,
        required:true,
    },
    avatar:
    {
        type:String,
        required:true,
    },
    poster:{
        type:String,
        required:true,
    },
    friends:[
        {
            name:{
                type:String,
            },
            id:{
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    teacher:{
        type:Boolean,
        default:false
    },
    postsLength:[
        {
            id:{
                type:Schema.Types.ObjectId,
                ref:'Post'
            }
            
        }
    ]
})



// Get Data User
userSchema.methods.getData = function(){
    return {
        id:this._id,
        name:this.name,
        username:this.username,
        avatar:this.avatar,
        poster:this.poster,
        teacher:this.teacher
    }
}
// return jsonwebtokn code for user datas
userSchema.methods.getJwt = function(){
    let data = this.getData();
    data.token = jwt.sign(data , process.env.SECRET_KEY)
    return data;
}
// Chech Password
userSchema.methods.checkPassword = function(password){
    return password == this.password
}
// export user model
const User = mongoose.model('User',userSchema);
module.exports = User;