const jwt = require('jsonwebtoken');
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.pharmacyEmail = async (req, res) => {
  
  const token = req.params.token;
  if (token && token != null && token != undefined) {
  jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
  
     try {
      await pharmaciesModel.findOneAndUpdate(
        { email: decodded },
        { isVerified: true }
      );
         res.json({message:'email verified'});
     } catch (error) {
        res.json({message:error});
     }

  });
}
else {
  res.json({message:'error in token or token not provided'});
}

};

module.exports.customerEmail = async (req, res) => {
   
  const token = req.params.token;
  if (token && token != null && token != undefined) {
  jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
    //console.log(decodded);
    try {
    await customersModel.findOneAndUpdate(
      { email: decodded },
      { isVerified: true }
    );
    res.json({message:'email verified'});
  } catch (error) {
     res.json({message:error});
  }
  });
}
else {
  res.json({message:'error in token or token not provided'});
}
};