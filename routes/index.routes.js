const indexRouter = require('express').Router();
const signinController=require ('../controllers/signin.controller');
const verifyToken=require('../middlewares/auth');
indexRouter.get('/',signinController.home);

indexRouter.post('/pharmacySignin',signinController.pharmacySignin);
indexRouter.post('/customerSignin',signinController.customerSignin);



module.exports = indexRouter;