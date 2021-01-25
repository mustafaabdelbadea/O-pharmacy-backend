const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.customerCurrent=async (req,res)=>{
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        const customerId = decoded._id;
        const orderId=req.params.orderId;
        //const orderId=req.body._id;
        try {
            const orderData=await ordersModel.findById({_id:orderId});
            if(orderData.globalStatus=='done'||orderData.globalStatus=='accepted'||orderData.globalStatus=='notAccepted'||orderData.globalStatus=='canceled'){
            
                const pharmacyId=orderData.pharmaciesID[0].id;
                const customersId=orderData.customerID;
                let pharmacyData;
                if (orderData.globalStatus=='canceled'||orderData.globalStatus=='accepted'||orderData.globalStatus=='notAccepted') {
                    pharmacyData=await pharmaciesModel.findById({_id:pharmacyId}).select(" name phones logo locationAsAddress locationAsCoordinates");
                }else{
                    pharmacyData=await pharmaciesModel.findById({_id:pharmacyId}).select(" name phones logo rate locationAsAddress locationAsCoordinates");
                }
                
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

module.exports.pharmcyCurrent=async (req,res)=>{
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        const customerId = decoded._id;
        const orderId=req.params.orderId;
        //const orderId=req.body._id;
        try {
            const orderData=await ordersModel.findById({_id:orderId});
            if(orderData.globalStatus=='done'||orderData.globalStatus=='accepted'||orderData.globalStatus=='notAccepted'||orderData.globalStatus=='canceled'){
            
                const pharmacyId=orderData.pharmaciesID[0].id;
                const customersId=orderData.customerID;
                let customersData=await customersModel.findById({_id:customersId}).select(" name phone photo locationAsAddress locationAsCoordinates");
                res.json({orderData,customersData});

            }
            else{
                 res.json("no order found");
            }
        } catch (error) {
             res.json(error);
        }
    })

}