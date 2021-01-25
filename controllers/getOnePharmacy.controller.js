const jwt = require('jsonwebtoken');
const pharmaciesModel = require("../models/pharmacies.model");
module.exports.getOnePharmacy=async (req,res)=>{
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        console.log('test')
        const onePharmacyId=req.params.pharmacyID;
        try {

            const onePharmacy=await pharmaciesModel.findById({_id:onePharmacyId}).select("name phones locationAsAddress locationAsCoordinates rate logo");;
            console.log(onePharmacy)

            res.json(onePharmacy);

        } catch (error) {
             res.json(error);
        }
    })

}