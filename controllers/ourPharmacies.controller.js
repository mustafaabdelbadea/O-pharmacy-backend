const pharmaciesModel = require('../models/pharmacies.model');
const pharamciesModel=require('../models/pharmacies.model')

module.exports.ourPharmacies=async (req,res)=>{
    
        let pharmacies=await pharmaciesModel.find({}).select("name phones locationAsAddress rate logo");
     res.json(pharmacies);
}