const Post = require('../models/post');
const User = require('../models/user');
module.exports.home =  async function(req,res){

     //  Post.find({},function(err,posts){

     //      return res.render('home',{
     //           title:'home',
     //           posts: posts
     //    });

     //  })


     ////without use of async await callback hell
      // Post.find({})
      // .populate('user')
      // .populate({
      //        path:'comment',
      //        populate: {

      //              path: 'user'
      //        }
            
      // })
      
      // .exec(function(err,posts){

      //       User.find({},function(err,user){
             
      //             return res.render('home',{
      //                   title:'home',
      //                   posts: posts,
      //                   all_user:user
      //            });

      //       });
           
        

      // })

      //with use of async await

      try {

            let posts  = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                   path:'comment',
                   populate: {
      
                         path: 'user'
                   }
                  
            });
            
            
      
              let user  = await User.find({});
      
      
              return res.render('home',{
                  title:'home',
                  posts: posts,
                  all_user:user
           });
          
            
      } catch (error) {
            
            console.log("errpr",error);
      }  

     
}