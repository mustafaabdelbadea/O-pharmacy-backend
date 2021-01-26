const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');

module.exports.pharmacyAgreeOrder = (req, res) => {
    let token = req.header('token');
    token = token.substring(6);

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
        let orderId;
        try {
            orderId = req.body.order_id;
        } catch (error) {
            res.json(error);
        }
        try {
            //const orderId0=req.body._id
            //notAgreedOrders = await ordersModel.find({ globalStatus: "notAccepted", _id:orderId0})

            //get all not accepted orders 
            notAgreedOrders = await ordersModel.find({ _id: orderId, globalStatus: "notAccepted" })
            //loop to all order and all pharmacies id
            console.log(notAgreedOrders)
            if (notAgreedOrders.length != 0) {
                for (let i = 0; i < notAgreedOrders.length; i++) {
                    for (let j = 0; j < notAgreedOrders[i].pharmaciesID.length; j++) {

                        //search if pharmacy id in orders to get this order 
                        if (notAgreedOrders[i].pharmaciesID[j].id == pharmacyId && notAgreedOrders[i].pharmaciesID[j].status == "active") {

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

// module.exports.pharmacyNotAgree = (req, res) => {
//     let token = req.header('token');
//     token =token.substring(6);

//     jwt.verify(token, 'pharmjwt', async (err, decoded) => {

//         let notAgreedOrders = [];
//     //    //get pharmacy id from header
//         const pharmacyId = decoded._id;
//     let orderId;
//                         try {
//                              orderId=req.body.order_id;
//                         } catch (error) {
//                              res.json(error);
//                         }
//         try {


//             //get all not accepted orders 
//             notAgreedOrders = await ordersModel.find({_id:orderId, globalStatus: "notAccepted" })
//             //loop to all order and all pharmacies id
//             //console.log(notAgreedOrders)
//             if (notAgreedOrders.length != 0) {
//                 for (let i = 0; i < notAgreedOrders.length; i++) {
//                     for (let j = 0; j < notAgreedOrders[i].pharmaciesID.length; j++) {
//                         //search if pharmacy id in orders to get this order 
//                         console.log(notAgreedOrders[0].pharmaciesID[j],pharmacyId)
//                         if (notAgreedOrders[i].pharmaciesID[j].id == pharmacyId && notAgreedOrders[i].pharmaciesID[j].status == "active") {
//                             console.log('test');

//                             const selectedPharmacy = notAgreedOrders[i].pharmaciesID[j].id;

//                             try {

//                                 notAgreedOrders[i].pharmaciesID[j].status = 'notActive';
//                                 await ordersModel.findOneAndUpdate({ _id: orderId },
//                                     {
//                                         //replace the old data and put a new data with update
//                                         "$set": notAgreedOrders[i]
//                                     }

//                                 );
//                                 let active=false;
//                                 for (let a = 0; a < notAgreedOrders.length; a++) {
//                                     for (let p = 0; p < notAgreedOrders[a].pharmaciesID.length; p++) {
//                                         console.log('test1')
//                                     if(notAgreedOrders[a].pharmaciesID[p].status == "active"){
//                                         console.log('test2');
//                                         active==true;
//                                         break;
//                                     }

//                                     }}
//                                     if(active){
//                                         res.json({ msg: 'order canceled' });

//                                     }
//                                     else{
//                                         await ordersModel.findOneAndDelete({_id: orderId});
//                                         res.json({ msg: 'order canceled' });

//                                     }
//                             }
//                                 catch (error) {
//                                 res.json(error);
//                             }

//                         }
//                     }
//                 }
//             }
//             else {
//                 res.json({ msg: "no orders found" });

//             }
//         } catch (error) {
//             console.log(error)
//         }

//     })

// }





module.exports.pharmacyNotAgree = (req, res) => {
    let token = req.header('token');
    token = token.substring(6);
    jwt.verify(token, 'pharmjwt', async (err, decoded) => {
        let notAgreedOrders = [];
        //    //get pharmacy id from header
        const pharmacyId = decoded._id;
        let orderId;
        try {
            orderId = req.body.order_id;
        } catch (error) {
            res.json(error);
        }
        try {
            //get all not accepted orders 
            notAgreedOrders = await ordersModel.find({ _id: orderId, globalStatus: "notAccepted" })
            console.log(notAgreedOrders)
            //loop to all order and all pharmacies id
            //console.log(notAgreedOrders)
            if (notAgreedOrders.length != 0) {
                for (let i = 0; i < notAgreedOrders.length; i++) {
                    for (let j = 0; j < notAgreedOrders[i].pharmaciesID.length; j++) {
                        //search if pharmacy id in orders to get this order 
                        console.log(notAgreedOrders[0].pharmaciesID[j], pharmacyId)
                        if (notAgreedOrders[i].pharmaciesID[j].id == pharmacyId && notAgreedOrders[i].pharmaciesID[j].status == "active") {
                            const selectedPharmacy = notAgreedOrders[i].pharmaciesID[j].id;
                            try {
                                notAgreedOrders[i].pharmaciesID[j].status = 'notActive';
                                await ordersModel.findOneAndUpdate({ _id: orderId },
                                    {
                                        //replace the old data and put a new data with update
                                        "$set": notAgreedOrders[i]
                                    }
                                );
                                let active = false;
                                for (let p = 0; p < notAgreedOrders[i].pharmaciesID.length; p++) {
                                    console.log('test1')
                                    if (notAgreedOrders[i].pharmaciesID[p].status == "active") {
                                        console.log('test2');
                                        active = true;
                                        break;
                                    }
                                }
                                console.log(active)
                                if (active) {
                                    console.log('testa2222')
                                    res.json({ msg: 'order canceled' });
                                }
                                else {
                                    await ordersModel.findOneAndDelete({ _id: orderId });
                                    res.json({ msg: 'order canceled' });
                                }
                            }
                            catch (error) {
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