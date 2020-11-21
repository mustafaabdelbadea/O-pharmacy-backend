const { check, validationResult } = require('express-validator')


module.exports.phoneValidation=check('phone','invalid input').matches(/^(201)[0-9]{9}/);