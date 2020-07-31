const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
//tell passport to use new strategy for google login

passport.use(new googleStrategy({
      clientID:env.google_clientID,
      clientSecret:env.google_clientSecret,
      callbackURL:env.google_callbackURL
        },
        function(accessToken,refreshToken, profile,done) {
                User.findOne({email:profile.emails[0].value}).exec(function(err,user){
                    if(err){console.log(err);return ;}

                    console.log(user);

                    if(user){
                        //if found the user send as req.user
                        return done(null,user);
                    }else {

                        //if not found then create user and
                           User.create({
                            name:profile.displayName,
                            email:profile.emails[0].value,
                            password:crypto.randomBytes(20).toString('hex')
                           },function(err,user){
                            if(err){console.log("Error in Creating the User Using Google Strategy",err);return ;}
                               // set as req.user
                            return done(null,user);
                           })
                    }
                })
        }
))
module.exports = passport;