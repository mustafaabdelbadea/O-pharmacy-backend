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
const phoneValidation=require('../controllers/phoneValidation.controller');
const medicalhistoryController=require('../controllers/medicalhistory.controller');
const resetPasswordController=require('../controllers/resetPassword.controller');
const resetPasswordTokenController=require('../controllers/resetPasswordToken.controller');
const forgotPasswordValidation=require('../controllers/forgotPasswordValidation.controller')
indexRouter.get('/', authMiddleware, signinController.home);
indexRouter.post('/pharmacySignin', signinVaildation.signinValidation, signinController.pharmacySignin);
indexRouter.post('/customerSignin', signinVaildation.signinValidation, signinController.customerSignin);
indexRouter.get('/ourPharmacies',authMiddleware,ourPharmacies.ourPharmacies);
indexRouter.post('/pharmacySignup', validation.signupValidation, signupController.pharmacySignup);
indexRouter.post('/customerSignup', phoneValidation.phoneValidation,validation.signupValidation, signupController.customerSignup);
indexRouter.get('/pharmacyVerifyEmail/:token', verifyEmail.pharmacyEmail);
indexRouter.get('/customerVerifyEmail/:token', verifyEmail.customerEmail);
indexRouter.post('/resetPasswordCustomer',resetPasswordController.resetPasswordCustomer)
indexRouter.post('/customerResetPassword/:token',forgotPasswordValidation,resetPasswordTokenController.customerResetPassword)
indexRouter.post('/medicalhistory',authMiddleware, medicalhistoryController.medicalhistory );
indexRouter.get('/medicalhistoryRetrieve',authMiddleware, medicalhistoryController.retrieveData);
indexRouter.get('*',notfoundController.notfound )
//validation.signupValidation,


module.exports = indexRouter;