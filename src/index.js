const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json()); // to conver into json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){ 
    console.log("--------------------------------------");
    console.log("TimeStamp  : ",new Date());
    console.log("Ip Address : ",req.ip);
    console.log("Website    :   localhost:3000",req.url);
    console.log("--------------------------------------");
    next()
})



app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});