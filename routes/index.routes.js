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
const forgotPasswordController=require('../controllers/forgotPassword.controller');
const forgotPasswordTokenController=require('../controllers/forgotPasswordToken.controller');
const forgotPasswordValidation=require('../controllers/forgotPasswordValidation.controller');
const editController=require('../controllers/editData.controler');
const getNearestPharmacy=require('../controllers/getNearestPharmacy.controller');
const pharmacyAgreeOrder=require('../controllers/pharmacyAgreeOrder.controller');
indexRouter.get('/', authMiddleware, signinController.home);
indexRouter.post('/pharmacySignin', signinVaildation.signinValidation, signinController.pharmacySignin);
indexRouter.post('/customerSignin', signinVaildation.signinValidation, signinController.customerSignin);
indexRouter.get('/ourPharmacies',authMiddleware,ourPharmacies.ourPharmacies);
indexRouter.post('/pharmacySignup', validation.signupValidation, signupController.pharmacySignup);
indexRouter.post('/customerSignup', phoneValidation.phoneValidation,validation.signupValidation, signupController.customerSignup);
indexRouter.get('/pharmacyVerifyEmail/:token', verifyEmail.pharmacyEmail);
indexRouter.get('/customerVerifyEmail/:token', verifyEmail.customerEmail);
indexRouter.post('/forgotPasswordCustomer',forgotPasswordController.forgotPasswordCustomer)
indexRouter.post('/customerForgotPassword/:token',forgotPasswordValidation,forgotPasswordTokenController.customerForgotPassword)
indexRouter.post('/forgotPasswordPharmacy',forgotPasswordController.forgotPasswordPharmacy)
indexRouter.post('/pharmacyForgotPassword/:token',forgotPasswordValidation,forgotPasswordTokenController.pharmacyForgotPassword)
indexRouter.post('/medicalhistory',authMiddleware, medicalhistoryController.medicalhistory );
indexRouter.get('/medicalhistoryRetrieve',authMiddleware, medicalhistoryController.retrieveData);
indexRouter.post('/getNearestPharmacy',authMiddleware,getNearestPharmacy.nearestPharmacy)
indexRouter.post('/editPharmacyPass',authMiddleware,validation.editPassValidation,editController.edit_Pharmacy_password);
indexRouter.post('/editCustomerPass',authMiddleware,validation.editPassValidation,editController.edit_customer_password);
indexRouter.post('/editPharmacyName',authMiddleware,validation.editNameValidation,editController.edit_Pharmacy_name);
indexRouter.post('/editCustomerName',authMiddleware,validation.editNameValidation,editController.edit_customer_name);
indexRouter.post('/editPharmacyPhones',authMiddleware,editController.edit_Pharmacy_phones);
indexRouter.post('/addPharmacyPhones',authMiddleware,editController.add_Pharmacy_phones);
indexRouter.post('/editCustomerPhone',authMiddleware,phoneValidation.phoneValidation,editController.edit_customer_phone);
indexRouter.post('/editPharmacyAddress',authMiddleware,editController.edit_Pharmacy_address);
indexRouter.post('/editCustomerAddress',authMiddleware,editController.edit_customer_address);
indexRouter.post('/editPharmacyCoordinates',authMiddleware,editController.edit_Pharmacy_coordinates);
indexRouter.post('/editCustomerCoordinates',authMiddleware,editController.edit_customer_coordinates);
indexRouter.post('/pharmacyAgree',authMiddleware,pharmacyAgreeOrder.pharmacyAgreeOrder);
indexRouter.get('/pharmacyNotAgree',pharmacyAgreeOrder.pharmacyNotAgree);
indexRouter.get('*',notfoundController.notfound );
//validation.signupValidation,


module.exports = indexRouter;