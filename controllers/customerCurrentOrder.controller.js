const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');
const pharmaciesModel = require("../models/pharmacies.model");
module.exports.customerCurrent=async (req,res)=>{
    const token = req.header('token');
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        const customerId = decoded._id;
        const orderId=req.body._id;
        try {
            const orderData=await ordersModel.findById({_id:orderId});
            if(orderData.globalStatus=='accepted'){
            const pharmacyId=orderData.pharmaciesID[0].id;
                let pharmacyData=await pharmaciesModel.findById({_id:pharmacyId}).select(" name phones logo rate locationAsAddress locationAsCoordinates");
                res.json({orderData,pharmacyData});

            }
            else{
                 res.json("no order found");
            }
        } catch (error) {
             res.json(error);
        }
    })

}