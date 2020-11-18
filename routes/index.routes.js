const indexRouter = require('express').Router();
const signinController=require ('../controllers/signin.controller');


indexRouter.post('/pharmacySignin',signinController.pharmacySignin);
indexRouter.post('/customerSignin',signinController.customerSignin);



module.exports = indexRouter;