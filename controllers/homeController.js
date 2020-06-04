const Post = require('../models/post');
module.exports.home =  function(req,res){

     //  Post.find({},function(err,posts){

     //      return res.render('home',{
     //           title:'home',
     //           posts: posts
     //    });

     //  })

      Post.find({})
      .populate('user')
      .populate({
             path:'comment',
             populate: {

                   path: 'user'
             }
            
      })
      
      .exec(function(err,posts){
           
          return res.render('home',{
               title:'home',
               posts: posts
        });

      })
    
}