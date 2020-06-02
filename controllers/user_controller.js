 const User = require('../models/user');
// module.exports.profile = function(req,res){

//      return res.render('user_profile',{
//          title:'User profile'
//      });
// }

module.exports.profile = function(req,res){

          if(req.cookies.user_id){

            console.log(req.cookies.user_id);

            User.findById(req.cookies.user_id,function(err,user){
                     console.log(user);
                 if(user){
                  
                    console.log("in user profile")
                    return res.render('user_profile',{

                         title: 'user profile',
                         user: user
                    });
                 }

                 return res.redirect('/user/sign-in');
            })

                  
          }else{

              return res.redirect('/user/sign-in');
          }
}

module.exports.signUp = function(req,res){

      return res.render('user_sign_up',{

        title:'User Sign Up'

      });
}

module.exports.signIn = function(req,res){

       return res.render('user_sign_in',{

          title:'user Sign in'
       });
}

module.exports.create = function(req,res){
  
       if(req.body.password != req.body.confirm_password){

          return res.redirect('back');
       }

       User.findOne({email: req.body.email},function(err,user){
           if(err) { console.log('error in finding user in sigininup');return;}

           if(!user){

                User.create(req.body,function(err,user){

                    if(err) { console.log('error in creating user in sigininup');return;}
                    return res.redirect('/user/sign-in');
                })
           }else{
               return res.redirect('back');
           }

       });
}



//sign in and create session for the user

module.exports.createSession = function(req,res) {

        //step to authenticate
        //find User

       User.findOne({email: req.body.email},function(err,user){

         console.log(user.email);


        if(err) { console.log('error in finding user in sigininup');return;}

          if(user){
              if(user.password !=req.body.password){
                // console.log('user  not authenticated');
                 return res.redirect('back');
              }
                //   console.log('user authenticated');
               res.cookie('user_id',user.id);
              console.log(user.id);
              return res.redirect('/user/profile');
          }else{
            console.log(' back ');
                return res.redirect('back')
          }

       });

        //handle user found
}