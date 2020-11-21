const indexRouter = require('express').Router();
const signinController = require('../controllers/signin.controller');
const verifyToken = require('../middlewares/auth');
const signupController = require('../controllers/signup.controller');
const verifyEmail = require('../controllers/verifyEmail.controller');
const validation = require('../controllers/validation.controller');
const authMiddleware = require('../middlewares/auth');
const signinVaildation = require('../controllers/signinValidation');
const  ourPharmacies  = require('../controllers/ourPharmacies.controller');
const notfoundController=require('../controllers/notfound.controller');
const phoneValidation=require('../controllers/phoneValidation.controller')
indexRouter.get('/', authMiddleware, signinController.home);
indexRouter.post('/pharmacySignin', signinVaildation.signinValidation, signinController.pharmacySignin);
indexRouter.post('/customerSignin', signinVaildation.signinValidation, signinController.customerSignin);
indexRouter.get('/ourPharmacies',authMiddleware,ourPharmacies.ourPharmacies);
indexRouter.post('/pharmacySignup', validation.signupValidation, signupController.pharmacySignup);
indexRouter.post('/customerSignup', phoneValidation.phoneValidation,validation.signupValidation, signupController.customerSignup);
indexRouter.get('/pharmacyVerifyEmail/:token', verifyEmail.pharmacyEmail);
indexRouter.get('/customerVerifyEmail/:token', verifyEmail.customerEmail);
indexRouter.get('*',notfoundController.notfound )
//validation.signupValidation,


module.exports = indexRouter;