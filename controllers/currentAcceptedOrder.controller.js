const ordersModel = require('../models/orders.model');
const pharmaciesModel = require("../models/pharmacies.model");
const jwt = require('jsonwebtoken');

module.exports.customerCurrentOrders = (req, res) => 
{
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        console.log('test')
        const customerId = decoded._id;//take customer id from header token 
        try {
            console.log(customerId)
         let customerOrders;
         let pharmacyData;

         customerOrders = await ordersModel.find({customerID :customerId, $or: [
            { globalStatus: "accepted" },
            { globalStatus: "notAccepted" }
          ]})  
         console.log(customerOrders)
         //find all accepted order that has same loged in customer
        console.log('test')
         if (customerOrders.length == 0) {
            res.json({message:"no order founds"}) //no orders for this customer id
         }else{
            const pharmacyId=customerOrders[0].pharmaciesID[0].id;
            pharmacyData=await pharmaciesModel.findById({_id:pharmacyId}).select(" name phones logo rate locationAsAddress locationAsCoordinates");
            console.log(pharmacyData);
            res.json({message:'success',customerOrders,pharmacyData})//retrieve customer orders history 
              }           
        } catch (error) {
            res.json(error)
            console.log(error);

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
                    pharmacyOrders.push(orders[i]); //add order to history if it has same pharmacy id  
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