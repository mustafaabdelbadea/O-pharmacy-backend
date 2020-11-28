const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

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
          const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()){
          bcrypt.hash(req.body.password, 8, async (err, hashPassword) => {
          await customersModel.findOneAndUpdate(
            { email: decodded.email },
            { password:hashPassword}
          );
          
          res.json('Changed');
        })}
        }
      }
    });
  }
  else {
    res.json('error in token or token not provided');
  }
};
