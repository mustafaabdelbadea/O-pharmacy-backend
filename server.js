const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const indexRoute = require('./routes/index.routes')
const profilePic=require('./controllers/imageUpload.controller');
const uploads=require('./controllers/imageUpload.controller');
var multer = require('multer');

app.use(cors({}));
app.set('view engine', 'ejs');
//to send json max 50 mb 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
//app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(bodyParser);
mongoose.set('useFindAndModify', false);
//to make body parser encode 50mb 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//app.use(express.json());
app.use(uploads);
app.use(indexRoute);
//o-pharmacyDB
mongoose.connect("mongodb+srv://opharmacy:opharmacy@opharmacycluster.p3rne.mongodb.net/Opharmacy", { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect("mongodb://localhost:27017/myDB3", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)

app.listen(process.env.PORT||3000, () => {
    console.log('server is running now......')
})