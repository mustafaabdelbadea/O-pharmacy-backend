const medicalhistory = require('../models/medicalhistory.model');
const mongoose = require('mongoose')
module.exports.medicalhistory = async (req, res) => {
  const { doYouHaveDiabates, highBloodPreasure, highCholesterol,
    doYouSmoke, doYouVape, doYouDrinkAlcohol,
    doYouUseDrugs, doYouExercize, whatIsYourMaritalStatus,
    bloodType, doYouHaveOtherHealthCondition, atientConcerns } = req.body;

  const form = new medicalhistory({

    _id: mongoose.Types.ObjectId(),
    doYouHaveDiabates, highBloodPreasure, highCholesterol,
    doYouSmoke, doYouVape, doYouDrinkAlcohol,
    doYouUseDrugs, doYouExercize, whatIsYourMaritalStatus,
    bloodType, doYouHaveOtherHealthCondition, atientConcerns,
    customerID: req.body.customerID
  });
try {
  await form.save();
  res.json('success');

} catch (error) {
  res.json(error)
}
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
  const customerID = req.body.customerID ;
  try {
        
    const history = await medicalhistory.find({customerID})
    
    res.json(history)

  } catch (error) 
  {
    res.json(error);
  }
}
