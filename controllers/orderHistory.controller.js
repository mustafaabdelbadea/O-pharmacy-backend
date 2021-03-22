const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');

module.exports.customerOrderHistory = (req, res) => 
{
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async (err, decoded) => {

        const customerId = decoded._id;//take customer id from header token 
        try {
         let customerOrders=[];
         customerOrders = await ordersModel.find({customerID :customerId, $or: [
            { globalStatus: "done" },
            { globalStatus: "canceled" }
          ] })  
         //find all accepted order that has same loged in customer
        
         if (customerOrders.length == 0) {
            res.json({message:"no order found"}) //no orders for this customer id
         }else{
            res.json({message:'success',customerOrders})//retrieve customer orders history 
              }
            
        } catch (error) {
            res.json(error)
            console.log(error);

        }
    })

}

module.exports.pharmacyOrderHistory = (req, res) => 
{
    let token = req.header('token');
    token =token.substring(6);
    
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {

        const pharmacyId = decoded._id;//take pharmacy id from header token 
        try {
            orders = await ordersModel.find({ $or: [
                { globalStatus: "done" },
                { globalStatus: "canceled" }
              ] })//find all order 
              
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
                res.json({message:"no order found"})//no orders for this customer id
             }else{
                res.json({message:'success',customerOrders})//retrieve pharmacy orders history 
                  }


            
        } catch (error) {
            res.json(error)
            console.log(error);

        }
    })

}