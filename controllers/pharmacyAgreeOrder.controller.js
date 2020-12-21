const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');

module.exports.pharmacyAgreeOrder = (req, res) => {
    const token = req.header('token');
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {

        let notAgreedOrders = [];
    //    //get pharmacy id from header
        const pharmacyId = decoded._id;
    //     //get oder id from body
    //     const order_id=req.body.order_id;
        
    //     try {
    //         await ordersModel.findOneAndUpdate({ _id:order_id,globalStatus: "notAccepted" }, {
    //                                         globalStatus: "accepted", pharmaciesID: [{
    //                                             status: 'activated',
    //                                             id: pharmacyId
    //                                         }]
    //                                     });
    //                                     res.json({ msg: "order Accepted" });
    //     } catch (error) {
    // res.json(error);
  
    //     }
        try {
            //const orderId0=req.body._id
            //notAgreedOrders = await ordersModel.find({ globalStatus: "notAccepted", _id:orderId0})

            //get all not accepted orders 
            notAgreedOrders = await ordersModel.find({ globalStatus: "notAccepted" })
            //loop to all order and all pharmacies id
            console.log(notAgreedOrders)
            if (notAgreedOrders.length != 0) {
                for (let i = 0; i < notAgreedOrders.length; i++) {
                    for (let j = 0; j < notAgreedOrders[i].pharmaciesID.length; j++) {
                      let orderId;
                        try {
                             orderId=req.body.order_id;
                        } catch (error) {
                             res.json(error);
                        }
                        //search if pharmacy id in orders to get this order 
                        if (notAgreedOrders[i].pharmaciesID[j].id == pharmacyId && notAgreedOrders[i].pharmaciesID[j].status == "active") {
                            // const orderId = notAgreedOrders[i]._id;
                           
                            const selectedPharmacy = notAgreedOrders[i].pharmaciesID[j].id;
                            
                            try {
                                
                                //change the global status that mean there is a pharmacy take the order and delete other pharmacies and set just one pharmacy
                                await ordersModel.findOneAndUpdate({ _id: orderId }, {
                                    globalStatus: "accepted", pharmaciesID: [{
                                        status: 'activated',
                                        id: selectedPharmacy
                                    }]
                                });
                                res.json({ msg: "order Accepted" });
                            } catch (error) {
                                res.json(error);
                            }

                        }
                    }
                }
            }
            else {
                res.json({ msg: "no orders found" });

            }
        } catch (error) {
            console.log(error)
        }

    })

}




module.exports.pharmacyNotAgree = (req, res) => {
    const token = req.header('token');
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {

        let notAgreedOrders = [];
        const pharmacyId = decoded._id;
        console.log(pharmacyId);
        try {
            //get all not accepted orders 
            notAgreedOrders = await ordersModel.find({ globalStatus: "notAccepted" })
            //loop to all order and all pharmacies id
            console.log(notAgreedOrders)
            if (notAgreedOrders.length != 0) {
                console.log('ssa')
                for (let i = 0; i < notAgreedOrders.length; i++) {
                    for (let j = 0; j < notAgreedOrders[i].pharmaciesID.length; j++) {
                        //search if pharmacy id in orders to get this order 
                        if (notAgreedOrders[i].pharmaciesID[j].id == pharmacyId && notAgreedOrders[i].pharmaciesID[j].status == "active") {
                            console.log(notAgreedOrders[i].pharmaciesID[j].status)
                            const orderId = notAgreedOrders[i]._id;
                            const selectedPharmacy = notAgreedOrders[i].pharmaciesID[j]._id;
                            // console.log(orderId);
                            //console.log(selectedPharmacy);
                            //  console.log(notAgreedOrders[i].pharmaciesID[j]);
                            //    console.log(notAgreedOrders);
                            try {
                                //const allOrders=[]
                                //change the global status that mean there is a pharmacy take the order and delete other pharmacies and set just one pharmacy
                                // console.log(j)
                                //  await ordersModel.findOneAndUpdate({pharmaciesID._id},{status:'notActive'})
                                notAgreedOrders[i].pharmaciesID[j].status = 'notActive';
                                await ordersModel.findOneAndUpdate({ _id: orderId },
                                    {
                                        //replace the old data and put a new data with update
                                        "$set": notAgreedOrders[i]
                                    }


                                    //     // : [{
                                    //     //     status: 'active',
                                    //     //     id: selectedPharmacy
                                    //     // }]
                                );
                                res.json({ msg: 'updated' });
                            } catch (error) {
                                console.log(error);
                                res.json(error);
                            }

                        }
                    }

                }
            }
            else {
                res.json({ msg: "no orders found" });

            }
        } catch (error) {
            console.log(error)
        }

    })

}