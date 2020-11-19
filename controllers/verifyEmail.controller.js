const jwt = require('jsonwebtoken');
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.pharmacyEmail = async (req, res) => {
  jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
    //console.log(decodded);
    await pharmaciesModel.findOneAndUpdate(
      { email: decodded },
      { isVerified: true }
    );

    res.redirect("/");
  });

};

module.exports.customerEmail = async (req, res) => {
  jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
    //console.log(decodded);
    await customersModel.findOneAndUpdate(
      { email: decodded },
      { isVerified: true }
    );

    res.redirect("/");
  });

};