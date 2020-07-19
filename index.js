const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port  = 8000;
const expressLayout = require('express-ejs-layouts');

//passport session
const session = require('express-session');
const passport = require('passport');
const googlePassport = require('./config/passport-google-oauth2-strategy');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');


const db = require('./config/mongoose');

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

//google authentication

app.use(sassMiddleware({
     src:'./assets/scss',
     dest:'./assets/css',
     debug:true,
     outputStyle:'extended',
     prefix:'/css'
}

));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

//make the upload path availabe to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayout);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//use express router



//set the views
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store session on cookie


app.use(session({
     name: 'codeial',
     //TODO change the secret before deployment
     secret: 'blahsomething',
     saveUninitialized: false,
     resave:false,
     cookie:{
            maxAge: (1000*60*100)
     },
     store: new MongoStore(

            {
                 mongooseConnection:db,
                 autoRemove: 'disabled'
            },
            function(err){
                 console.log(err || 'connect to db');
            }
     )

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash user

  app.use(flash());
  app.use(customMWare.setFlash);
app.use('/',require('./routes'));


app.listen(port,function(err){

     if(err){

            console.log(`Error in running the server ${err}`);
            return;
     }

     console.log("server is running on the port = ",port);
})