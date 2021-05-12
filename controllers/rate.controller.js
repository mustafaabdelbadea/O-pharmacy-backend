const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');
const pharmaciesModel = require("../models/pharmacies.model");
module.exports.rate = async (req, res) => {
    const token = req.header('token');
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        //get order id and rate from body
        const { orderId, rate, report } = req.body;
        //pharmacy id
        let pharmacyId;
        try {
            //get order by order id
            const orderData = await ordersModel.findById({ _id: orderId });
            //get pharmacy id --> array[0] because no other pharmacies in array
            pharmacyId = orderData.pharmaciesID[0].id;
            //to store rate
            let calcRate = 0;
            //to calc n rates
            let loop = 0;
            //check if order has rated before or not
            if (orderData.rate != null) {
                res.json("can't rate again");
            } else {
                try {
                    //add rate to order
                    await ordersModel.findOneAndUpdate({ _id: orderId }, { rate });
                    try {
                        //get all order to this pharmacy and rate this  
                        const pharmacyRate = await ordersModel.find({ pharmaciesID: { $elemMatch: { id: pharmacyId } }, globalStatus: 'accepted' });
                        for (let i = 0; i < pharmacyRate.length; i++) {
                            if (pharmacyRate[i].rate == null) {
                                //becuase order not rated skip it
                                continue;
                            } else {
                                //calc rate
                                calcRate = pharmacyRate[i].rate + calcRate;
                                loop++;
                            }
                        }
                        //get avg 
                        const final_rate = calcRate / loop;
                        if (report == null || report == undefined) {
                            //update the rate in pharmacy model
                            await pharmaciesModel.findOneAndUpdate({ _id: pharmacyId }, { rate: final_rate, report: null });
                            res.json('Rated successfully');
                        }
                        else {
                            await pharmaciesModel.findOneAndUpdate({ _id: pharmacyId }, { rate: final_rate, report });
                            res.json('Rated and reported successfully');
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error)
        }
    });
}