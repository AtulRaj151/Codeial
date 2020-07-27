const mongoose = require('mongoose');


const postSchema = mongoose.Schema({

         content:{
             type:String,
             require:true
         },
         user:{
             type:mongoose.Schema.Types.ObjectId,
             ref:'User'
         },

         //include the array of id of all comments and comments is an array of
         comment :[
               {
                   type:mongoose.Schema.Types.ObjectId,
                   ref:'Comment'
               }
         ],
         like: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Like'
            }
        ]
},{
    timestamps:true
})



const Post = mongoose.model('Post',postSchema);
module.exports = Post;