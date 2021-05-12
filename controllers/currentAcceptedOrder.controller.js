const ordersModel = require('../models/orders.model');
const pharmaciesModel = require("../models/pharmacies.model");
const customersModel = require("../models/customer.model");
const jwt = require('jsonwebtoken');

module.exports.customerCurrentOrders = (req, res) => 
{
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        const customerId = decoded._id;//take customer id from header token 
        try {
         let customerOrders;
         let pharmacyData;

         customerOrders = await ordersModel.find({customerID :customerId, $or: [
            { globalStatus: "accepted" },
            { globalStatus: "notAccepted" }
          ]})  
         //find all accepted order that has same loged in customer
         if (customerOrders.length == 0) {
            res.json({message:"no order founds"}) //no orders for this customer id
         }else{
            const pharmacyId=customerOrders[0].pharmaciesID[0].id;
            pharmacyData=await pharmaciesModel.findById({_id:pharmacyId}).select(" name phones logo rate locationAsAddress locationAsCoordinates");
            res.json({message:'success',customerOrders,pharmacyData})//retrieve customer orders history 
              }           
        } catch (error) {
            res.json(error)

        }
    })

}

module.exports.pharmacyCurrentOrders = (req, res) => 
{
    let  token = req.header('token');
    token =token.substring(6);
    
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {

        const pharmacyId = decoded._id;//take pharmacy id from header token 
        try {
            orders = await ordersModel.find({ globalStatus: "accepted" })//find all accepted order
            let pharmacyOrders=[];
           
            for( i=0; i<orders.length; i++){
        
                if(orders[i].pharmaciesID[0].id == pharmacyId)
                {
                    const customersId=orders[i].customerID;
                    let customersData=await customersModel.findById({_id:customersId}).select(" name phone photo locationAsAddress locationAsCoordinates");    
                    pharmacyOrders.push({orderdata:orders[i],customersData}); //add order to history if it has same pharmacy id  
                }
                else
                {
                    pharmacyOrders=pharmacyOrders;//order not added to history if pharmacy id not same
                }
            }


            if (pharmacyOrders.length == 0) {
                res.json({message:"no order founds"})//no orders for this customer id
             }else{
                res.json({message:'success',pharmacyOrders})//retrieve pharmacy orders history 
                  }


            
        } catch (error) {
            res.json(error)
            console.log(error);

        }
    })

}