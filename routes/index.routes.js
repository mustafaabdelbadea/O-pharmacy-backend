const indexRouter = require('express').Router();
const signinController = require('../controllers/signin.controller');
const verifyToken = require('../middlewares/auth');
const signupController = require('../controllers/signup.controller');
const verifyEmail = require('../controllers/verifyEmail.controller');
const validation = require('../controllers/validation.controller');
const authMiddleware = require('../middlewares/auth');
const signinVaildation = require('../controllers/signinValidation');
indexRouter.get('/', authMiddleware, signinController.home);

indexRouter.post('/pharmacySignin', signinVaildation.signinValidation, signinController.pharmacySignin);
indexRouter.post('/customerSignin', signinVaildation.signinValidation, signinController.customerSignin);

indexRouter.post('/pharmacySignup', validation.signupValidation, signupController.pharmacySignup);
indexRouter.post('/customerSignup', validation.signupValidation, signupController.customerSignup);
indexRouter.get('/pharmacyVerifyEmail/:token', verifyEmail.pharmacyEmail);
indexRouter.get('/customerVerifyEmail/:token', verifyEmail.customerEmail);

//validation.signupValidation,


module.exports = indexRouter;