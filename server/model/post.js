const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Comment Schema
const commentSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    create_at:{
        type:Date,
        default:Date.now
    }
})
const likeSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
//Create Post schema
const postschema = new Schema
({
    title:{
        type:String,
        required:true,
        maxlength:70
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
    ,
    comments:[
        commentSchema
    ],
    likes:[
        likeSchema
    ],
        
    create_at:{
        type:Date,
        default:Date.now
    }
})

const Post = mongoose.model("Post" , postschema);
module.exports = Post;