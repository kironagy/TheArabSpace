const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
const lessonseSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    src:{
        type:String,
        required:true,
    },
    comments:[
        commentSchema
    ],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    create_at:{
        type:Date,
        default:Date.now
    }
})

const Lesson = mongoose.model('Lesson',lessonseSchema);
module.exports = Lesson;