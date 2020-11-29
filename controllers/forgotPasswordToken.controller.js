const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.customerForgotPassword = async (req, res) => {
  //retrive token from url 
  const token = req.params.token;
//check token if exists and not equal null or undefined

  if (token && token != null && token != undefined) {
//verify token 
    jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
      const isUsed=decodded.isUsed;
      //make an expairedate for token after 10 mins token will stop 
      ExpaireDate = decodded.DateNow + 600000
      //check if token expaired or not
      if (Date.now() > ExpaireDate||isUsed==true) {
        res.json("time out or token has been used before");
      }
      else {
        //check if there a problem in token
        if (err) {
          res.json('authentication fallid or error in token');
        } else {
          //check if there an error in validaiton and confirmation password
          const errors = validationResult(req);
  console.log(errors);
  //if no errors are exist change the password 
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



module.exports.pharmacyForgotPassword = async (req, res) => {
  //retrive token from url 
  const token = req.params.token;
//check token if exists and not equal null or undefined

  if (token && token != null && token != undefined) {
//verify token 
    jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
      const isUsed=decodded.isUsed;
      //make an expairedate for token after 10 mins token will stop 
      ExpaireDate = decodded.DateNow + 600000
      //check if token expaired or not
      if (Date.now() > ExpaireDate||isUsed==true) {
        res.json("time out or token has been used before");
      }
      else {
        //check if there a problem in token
        if (err) {
          res.json('authentication fallid or error in token');
        } else {
          //check if there an error in validaiton and confirmation password
          const errors = validationResult(req);
  console.log(errors);
  //if no errors are exist change the password 
  if (errors.isEmpty()){
          bcrypt.hash(req.body.password, 8, async (err, hashPassword) => {
          await pharmaciesModel.findOneAndUpdate(
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
