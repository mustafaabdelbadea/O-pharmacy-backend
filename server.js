const express = require('express');
const app=express();
const bodyParser=require('body-parser').urlencoded({extended:false});
const path=require('path');
const mongoose=require('mongoose');
const cors=require('cors');
app.use(cors({}));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(bodyParser);
mongoose.set('useFindAndModify',false);