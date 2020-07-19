 const User = require('../models/user');
 const fs = require('fs');
 const path = require('path');
module.exports.profile = function(req,res){

    User.findById(req.params.id,function(err,user){

        return res.render('user_profile',{
            title:'User profile',
            profile_user:user
        });

    });

  
}

module.exports.update = async function(req,res){

    //   if(req.user.id == req.params.id){
    //          User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
               
    //              return res.redirect('back');

    //          })
    //   }else{

    //     return res.status-line(401).send('unauthorised');
    //   }

    if(req.user.id == req.params.id){

          try {
  
           let user =  await User.findById(req.params.id);
           User.uploadedAvatar(req,res,function(err){

                 if(err){
                      console.log('** MULTER error **',err);
                  
                 }

                  user.name = req.body.name;
                  user.email = req.body.email;

                  if(req.file){

                       if(user.avatar){
                           fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                       }

                        user.avatar = User.avatarPath + '/' + req.file.filename;
                  }
                  user.save();
                  return res.redirect('back');
           });
              
          } catch (error) {
            req.flash('error',error);
            console.log('error',error);
                return res.redirect('back');
              
          }
              
          }else{
    
            req.flash('error',"unauthorised request");
            return res.status-line(401).send('unauthorised');
          }
}

module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){

        return res.redirect('/user/profile');
     }


      return res.render('user_sign_up',{

        title:'User Sign Up'

      });
}

module.exports.signIn = function(req,res){

     if(req.isAuthenticated()){

        return res.redirect('/user/profile');
     }

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
    console.log('In createSession')
    req.flash('success',"logged in successfully");
   return res.redirect('/');
}

module.exports.destroySession = function(req,res){
         req.logout();
         req.flash('success',"You have logged out");
      return res.redirect('/');
}