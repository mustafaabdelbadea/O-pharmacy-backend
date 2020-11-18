const indexRouter = require('express').Router();
const signinController=require ('../controllers/signin.controller');
const signupController=require ('../controllers/signup.controller');
const validation=require('../controllers/validation.controller');

indexRouter.post('/pharmacySignin',signinController.pharmacySignin);
indexRouter.post('/customerSignin',signinController.customerSignin);

indexRouter.post('/pharmacySignup',validation.signupValidation,signupController.pharmacySignup);
indexRouter.post('/customerSignup',validation.signupValidation,signupController.customerSignup);



module.exports = indexRouter;