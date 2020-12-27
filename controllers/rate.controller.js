const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');
const pharmaciesModel = require("../models/pharmacies.model");
module.exports.rate = async (req, res) => {
    const token = req.header('token');
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        const _id = decoded._id;
        const { orderId, rate } = req.body;
        let pharmacyRate=[];
        let pharmacyId;
        try {
            //check if order has rated before or not
            const orderData = await ordersModel.findById({ _id: orderId });
            pharmacyId=orderData.pharmaciesID[0].id;
            if (orderData.rate != null) {
                res.json("can't rate again");
            } else {
                try {

                    await ordersModel.findOneAndUpdate({ _id: orderId }, { rate });

                   // await ordersModel.find({});

                    res.json("rated successfully");
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error)
        }



        // try {
        //     if (!rate==null) {
        //         res.json("can't rate again");
        //     } else {
        //         try {
        //             const {_id,rate}=req.body;

        //             ordersModel.findOneAndUpdate({_id},{rate});

        //             console.log(rate);
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }

        // } catch (error) {
        //     console.log(error);
        // }
        // try {

        //    let pharmacyRate=[];
        //    pharmacyRate=await  ordersModel.find({globalStatus: "accepted"});

        //    if (pharmacyRate.length != 0) {
        //     for (let i = 0; i < notAgreedOrders.length; i++) {
        //             //search if pharmacy id in orders to get this order 
        //             if (pharmacyRate[i].pharmaciesID[0].id == pharmacyId) {


        //             }}}
        //    console.log(pharmacyRate);
        // } catch (error) {
        //     console.log(error)
        // }
    });

}