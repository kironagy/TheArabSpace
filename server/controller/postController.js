const Post = require('../model/post');
const User = require('../model/user')
const createError = require('http-errors');
// Create a new post
exports.create = (req,res,next)=>{
    let data ={
        title:req.body.title,
        content:req.body.content,
        author:req.user.id,
    }
    Post.create(data)
    .then(post =>{

        User.findById(req.user.id)
        .then(user =>{
            user.postsLength.push(post._id)
            return user.save();
        })
        res.json(post)
    })
    .catch(next);
}
// Delete Post
exports.delete = (req,res,next)=>{
    Post.findByIdAndDelete(req.params.id)
    .then(next)
    .catch(next);
}

// Get All Posts
exports.list = (req,res,next)=>{
    Post.find()
    .populate('author','name avatar -_id')
    .then(post =>{
        res.json(post);
    })
    .catch(next)
}
// Details Post
exports.details = (req,res,next)=>{
    Post.findById(req.params.id)
    .populate('author','name avatar username _id')
    .populate('comments.author','name avatar username')
    .then(post =>{
        res.json(post)
    })
    .catch(err =>{
        if(err) throw createError('هذا المنشور غير موجود');
        next();
    })
    .catch(next)
}

// add comment

exports.comment = (req,res,next)=>{
    let data ={
        content:req.body.content,
        author:req.user.id
    }
    Post.findById(req.params.id)
    .then(post =>{
        post.comments.push(data)
        return post.save();
    })
    .then(post =>{
        res.json(post)
    })
    .catch(next)
}

exports.like = (req,res,next)=>{
    Post.findById(req.params.id)
    .then(post =>{
   
        post.likes.push({_id:req.user.id , author:req.user.username})
        return post.save().then(next)
    })
   
    .catch(next)
}

exports.unlike = (req,res,next)=>{
    Post.findById(req.params.id)
    .then(post =>{
        post.likes.remove(req.user.id)
        return post.save().then(next)
    })
    .catch(next)
}

