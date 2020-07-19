const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentMailer = require('../mailers/comment_mailer');
const commentEmailWorker = require('../worker/comment_email_worker');
module.exports.create = async function(req,res){

      try{

        let post = await Post.findById(req.body.post);

                   
                if(post){

                   let comment = await Comment.create({
                        content: req.body.content,
                        post:req.body.post,
                        user:req.user._id
                    });

                    post.comment.push(comment);
                    post.save();
                    comment = await comment.populate('user','name email').execPopulate();
                    //  commentMailer.newComment(comment);
                    let job = queue.create('emails',comment).save(function(err){
                        if(err) { console.log("error in sending comment maill",err); return;}
                        console.log("Job enqueued ",job.id);
                    })
                    if(req.xhr){
                       return res.status(200).json({
                         data:{
                           comment:comment
                         },
                         message:"Post Created"
                       })
                    }
                    req.flash('success',"Post Created");
                    res.redirect('/');

                }
            }catch(error){
                   console.log('error',error);
            }

}

module.exports.destroy = async function(req,res){


      try{

                let comment  =  await Comment.findById(req.params.id);

                if(comment.user == req.user.id){

                    let postId = comment.post;
                    comment.remove();


                    await Post.findByIdAndUpdate(postId,{$pull: {comment:req.params.id}});

                        return res.redirect('back');

                }else{

                  return  res.redirect('back');
                }
            }catch(error){
                   console.log('error',error);
            }
}