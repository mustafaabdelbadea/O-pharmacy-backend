const indexRouter = require('express').Router();
const signinController=require ('../controllers/signin.controller');
const verifyToken=require('../middlewares/auth');
const signupController=require ('../controllers/signup.controller');
const validation=require('../controllers/validation.controller');
indexRouter.get('/',signinController.home);

indexRouter.post('/pharmacySignin',signinController.pharmacySignin);
indexRouter.post('/customerSignin',signinController.customerSignin);

indexRouter.post('/pharmacySignup',signupController.pharmacySignup);
indexRouter.post('/customerSignup',signupController.customerSignup);
//validation.signupValidation,


module.exports = indexRouter;