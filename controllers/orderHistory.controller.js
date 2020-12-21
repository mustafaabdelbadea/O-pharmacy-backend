const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');

module.exports.customerOrderHistory = (req, res) => 
{
    const token = req.header('token');
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {

        const customerId = decoded._id;
        try {
         let customerOrders=[];
         customerOrders = await ordersModel.find({customerID :customerId, globalStatus: "Accepted" })
        
         if (customerOrders.length == 0) {
            res.json("no order founds")
         }else{
            res.json(customerOrders)
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

        const pharmacyId = decoded._id;
        try {
            orders = await ordersModel.find({ globalStatus: "Accepted" })
            let pharmacyOrders=[];
           for( i=0; i<orders.length; i++){
        
                if(orders[i].pharmaciesID[0].id == pharmacyId)
                {
                    pharmacyOrders.push(orders[i]);
                }
                else
                {
                    pharmacyOrders=pharmacyOrders;
                }
            }


            if (pharmacyOrders.length == 0) {
                res.json("no order founds")
             }else{
                res.json(pharmacyOrders)
                  }


            
        } catch (error) {
            res.json(error)
            console.log(error);

        }
    })

}



//customer1="5fb680c0b3321410249cf387"
//customer2="5fb684790fba2330ac9bffa8"
//pharmacy1="5fb6890f4331ab10881bf2fc"
//pharmacy2="5fb69f7f76d997448890fd7e"