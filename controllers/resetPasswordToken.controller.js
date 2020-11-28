const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const customersModel = require("../models/customer.model");

module.exports.customerResetPassword = async (req, res) => {
  const token = req.params.token;


  if (token && token != null && token != undefined) {

    jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
      
      ExpaireDate = decodded.DateNow + 6000000000000000
      if (Date.now() > ExpaireDate) {
        res.json("time out");
      }
      else {
        if (err) {
          res.json('authentication fallid or error in token');
        } else {
          // check('password', 'invalid input').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
          // check('confirmPassword', 'invalid input').custom((value, { req }) => {
          //   if (value !== req.body.password) {
          //     throw new Error('Password confirmation does not match password');
          //   }
          //   return true;
          // }),
          bcrypt.hash(req.body.password, 8, async (err, hashPassword) => {
          await customersModel.findOneAndUpdate(
            { email: decodded.email },
            { password:hashPassword}
          );
          
          res.json('Changed');
        })
        }
      }
    });
  }
  else {
    res.json('error in token or token not provided');
  }
};
