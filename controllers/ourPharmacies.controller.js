const pharmaciesModel = require('../models/pharmacies.model');

module.exports.ourPharmacies=async (req,res)=>{
    
        let pharmacies=await pharmaciesModel.find({}).select("name phones locationAsAddress locationAsCoordinates rate logo");
     res.json(pharmacies);
}