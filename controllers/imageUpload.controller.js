//image upload
const multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '- profile -' + Date.now())
    }
})
// only images with this extenctions can upload
function fileFilter(req, file, cb) {
    if (file.mimetype=="image/png" ||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"){
        cb(null, true)
    }
    else {
        cb(null, false)

    }
}

//send to server js and use it at app
var uploads=multer({dest:'uploads',fileFilter,storage}).single('img');
module.exports=uploads


// indexRouter.get('/', async (req, res) => {
    
//     // console.log(data);
//     res.render('index')
// })
// indexRouter.post('/handleForm',  (req, res) => {
   
//     if(req.file==undefined){
//        res.redirect('/');
//     }
//     else{
//         console.log(req.file)
//     }
//      res.redirect('/');
// })