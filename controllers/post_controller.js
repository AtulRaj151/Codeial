const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req,res){

        try {
            
            let post =  await Post.create({
                content:req.body.content,
                user:req.user._id
        });

          if(req.xhr){

            return res.status(200).json({

              data:{
                 post:post
              },
              message:"post created"

            });
          }
        req.flash('success','Post published');
        return res.redirect('back');
          
        } catch (error) {

          req.flash('error',error);

            console.log('error',error);
            return res.redirect('back');
            
        }

 

            
}

module.exports.destroy = async function(req,res){




      try {

        let post  = await Post.findById(req.params.id);
        if(post.user == req.user.id){

          // CHANGE :: delete the associated likes for the post and all its comments' likes too
          await Like.deleteMany({likeable: post, onModel: 'Post'});
          await Like.deleteMany({_id: {$in: post.comments}});


            post.remove();
           await Comment.deleteMany({post:req.params.id});

           //ajax

           if(req.xhr){
               return res.status(200).json({

                   data:{

                     post_id:req.params.id
                   },
                   message: "Post Deleted Successfully"
               });
           }
           req.flash('success','comment deleted');
                 return res.redirect('back');
        
             
         }else{
          req.flash('error','you cannot delte this post');
              res.redirect('back');
         }
          
      } catch (error) {
        req.flash('error',error);
        console.log('error',error);
            return res.redirect('back');
          
      }



        //.id means converting _id into string



}