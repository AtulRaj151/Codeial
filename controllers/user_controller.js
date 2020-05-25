 const User = require('../models/user');
module.exports.profile = function(req,res){

     return res.render('user_profile',{
         title:'User profile'
     });
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

module.exports.createSession = function(req,res){

}