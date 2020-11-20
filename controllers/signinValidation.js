const { check, validationResult } = require('express-validator')

module.exports.signinValidation = [
    check('email', 'invalid input').isEmail(),
    check('password', 'invalid input').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  ]