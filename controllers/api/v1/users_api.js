const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');


module.exports.createSession = async function(req,res){


    try {

        let user  = await User.findOne({email:req.body.email});

         if(!user || user.password != req.body.password ){

             return res.json(422,{
                 message: "Invalid user/password"
             });
         }
         return res.json(200,{
                     message:"Sign in Successful, Here is your token Keep it secure",
                     data:{
                         token: jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: '1000000'})
                     }
         });
        
    } catch (error) {

          console.log('******',error);
        return res.json(500,{
            message:"Internal Server Error"
        })
        
    }

    

}