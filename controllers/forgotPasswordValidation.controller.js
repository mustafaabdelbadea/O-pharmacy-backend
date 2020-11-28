const { check, validationResult } = require('express-validator')
module.exports=[
    check('password', 'invalid input').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    check('confirmPassword', 'invalid input').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
]