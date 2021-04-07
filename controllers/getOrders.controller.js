const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');
const customersModel = require("../models/customer.model");
module.exports.pharmacyGetOrders = (req, res) => {
   
    let token = req.header('token');
    token =token.substring(6);

   
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        let notAgreedOrders = [];
        const pharmacyId = decoded._id;
        try {
            //get all not accepted orders 
            notAgreedOrders = await ordersModel.find({ globalStatus: "notAccepted" })
            //loop to all order and all pharmacies id
            if (notAgreedOrders.length != 0) {
                for (let i = 0; i < notAgreedOrders.length; i++) {
                    for (let j = 0; j < notAgreedOrders[i].pharmaciesID.length; j++) {
                        //search if pharmacy id in orders to get this order 
                        if (notAgreedOrders[i].pharmaciesID[j].id == pharmacyId && notAgreedOrders[i].pharmaciesID[j].status == "active") {
                            //get the cutomer id to get his data
                            const customerID = notAgreedOrders[i].customerID;
                            try {
                                //get cutomer data
                                const customerData = await customersModel.findById({ _id: customerID }).select("name phone photo locationAsAddress locationAsCoordinates");
                                res.json({ message: "orders found" , order: notAgreedOrders[i], customerData: customerData });
                            } catch (error) {
                                res.json(error);
                            }
                        }
                    }
                }
            }
            else {
                res.json({ message: "no orders found" });

            }
        } catch (error) {
            console.log(error)
        }

    })

}

