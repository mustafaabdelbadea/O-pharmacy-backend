const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');

module.exports.customerOrderHistory = (req, res) => 
{
    const token = req.header('token');
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {

        const customerId = decoded._id;//take customer id from header token 
        try {
         let customerOrders=[];
         customerOrders = await ordersModel.find({customerID :customerId, globalStatus: "accepted" })  
         //find all accepted order that has same loged in customer
        
         if (customerOrders.length == 0) {
            res.json("no order founds") //no orders for this customer id
         }else{
            res.json(customerOrders)//retrieve customer orders history 
              }
            
        } catch (error) {
            res.json(error)
            console.log(error);

        }
    })

}

module.exports.pharmacyOrderHistory = (req, res) => 
{
    const token = req.header('token');
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
                res.json("no order founds")//no orders for this customer id
             }else{
                res.json(pharmacyOrders)//retrieve pharmacy orders history 
                  }


            
        } catch (error) {
            res.json(error)
            console.log(error);

        }
    })

}