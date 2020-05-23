const express = require('express');
const app = express();
const port  = 8000;
const expressLayout = require('express-ejs-layouts');
app.use(express.static('./assets'));

app.use(expressLayout);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express router

app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){

     if(err){

            console.log(`Error in running the server ${err}`);
            return;
     }

     console.log("server is running on the port = ",port);
})