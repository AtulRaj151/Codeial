const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

         content:{
             type:String,
             require:true
         },
         user:{
             type:mongoose.Schema.Types.ObjectId,
             ref:'User'
         }
},{
    timestamps:true
})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;