
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const port=8000;
const router=require('./routes/index.js');
const app=express();
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());
app.use('/',router);

const db=require('./config/mongoose');
console.log('hi');
app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
    }
    console.log('hi');
    console.log('server is up and running on port ',port);
})

