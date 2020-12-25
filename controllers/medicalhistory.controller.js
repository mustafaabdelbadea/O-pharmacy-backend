const medicalhistory = require('../models/medicalhistory.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.medicalhistory = async (req, res) => {
  const token = req.header('token');

  jwt.verify(token, 'pharmjwt', async (err, decoded) => {
    
    const _id = decoded._id;
    const { doYouHaveDiabates, highBloodPreasure, highCholesterol,
      doYouSmoke, doYouVape, doYouDrinkAlcohol,
      doYouUseDrugs, doYouExercize, whatIsYourMaritalStatus,
      bloodType, doYouHaveOtherHealthCondition, atientConcerns } = req.body;
  
    const checkMedical=await medicalhistory.findOne({customerID:_id});
   
    if (checkMedical) {
      try {
        medicalhistory.findOneAndUpdate({customerID:_id},{doYouHaveDiabates, highBloodPreasure, highCholesterol,
          doYouSmoke, doYouVape, doYouDrinkAlcohol,
          doYouUseDrugs, doYouExercize, whatIsYourMaritalStatus,
          bloodType, doYouHaveOtherHealthCondition, atientConcerns});
           res.json("updated");
      } catch (error) {
         res.json(error);
      }
    } else {
      const form = new medicalhistory({
  
        doYouHaveDiabates, highBloodPreasure, highCholesterol,
        doYouSmoke, doYouVape, doYouDrinkAlcohol,
        doYouUseDrugs, doYouExercize, whatIsYourMaritalStatus,
        bloodType, doYouHaveOtherHealthCondition, atientConcerns,
        customerID: _id
      });
    try {
      console.log(_id)
      await form.save();
      res.json('success');
    
    } catch (error) {
      res.json(error)
    }
    }

   
  });
 
};

// let _id = req.body.cusm;

//   try {
//     let user = await userModel.findOne({ _id });
//     if (user) {
//       res.json(user);
//     } else {
//       res.json("no user found");
//     }
//   } catch (error) {
//     res.json(error);
//  }

module.exports.retrieveData=async(req,res)=>{
  const token = req.header('token');

  jwt.verify(token, 'pharmjwt', async (err, decoded) => {
    const _id = decoded._id;
    const customerID = _id ;
    try {
          
      const history = await medicalhistory.find({customerID})
      
      res.json(history)
  
    } catch (error) 
    {
      res.json(error);
    }
  })



  
}
