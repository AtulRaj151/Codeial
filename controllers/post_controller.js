const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){

        try {
            
            let post =  await Post.create({
                content:req.body.content,
                user:req.user._id
        });
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

            post.remove();
           await Comment.deleteMany({post:req.params.id});
           req.flash('success','comment deleted');
                 return res.redirect('back');
        
             
         }else{
          req.flash('error','you cannot delte this post');
              res.redirect('back');
         }
          
      } catch (error) {
        req.flash('error',error);
        console.log('error',error);
            return;
          
      }



        //.id means converting _id into string



}