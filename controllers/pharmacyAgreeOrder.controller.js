const ordersModel = require('../models/orders.model');
const jwt = require('jsonwebtoken');

module.exports.pharmacyAgreeOrder = (req, res) => {
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
            if(notAgreedOrders.length!=0){
            for (let i = 0; i < notAgreedOrders.length; i++) {
                for (let j = 0; j < notAgreedOrders[i].pharmaciesID.length; j++) {
                    //search if pharmacy id in orders to get this order 
                    if (notAgreedOrders[i].pharmaciesID[j].id == pharmacyId) {
                        const orderId = notAgreedOrders[i]._id;
                        const selectedPharmacy = notAgreedOrders[i].pharmaciesID[j].id;
                        console.log(orderId)
                        try {
                            //change the global status that mean there is a pharmacy take the order and delete other pharmacies and set just one pharmacy
                            await ordersModel.findOneAndUpdate({ _id: orderId }, {
                                globalStatus: "accepted", pharmaciesID: [{
                                    status: 'active',
                                    id: selectedPharmacy
                                }]
                            });
                        } catch (error) {
                            res.json(error);
                        }

                    }
                    else {
                        res.json({ msg: "no orders found" });
                    }

                }

            }
        }
        else{
            res.json({ msg: "no orders found" });

        }
        } catch (error) {
            console.log(error)
        }

    })

}




module.exports.pharmacyNotAgree = (req, res) => {
    //  jwt.verify(token, 'pharmjwt', async(err, decoded) => {
    const testId = "mmk5a";
    const orders = [
        {
            customerId: "kmnasdkmsa",
            order: "asas",
            status: "notAcceptedYet",
            pharmaciesId: [
                {
                    id: "mmk5",
                    status: "active"
                },
                {
                    id: "mmask5",
                    status: "active"
                }, {
                    id: "mmk265",
                    status: "active"
                }, {
                    id: "mmk5a",
                    status: "active"
                }
            ]

        }
    ];
    try {
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].pharmaciesId.length; j++) {
                if (orders[i].pharmaciesId[j].id == testId) {
                    orders[i].pharmaciesId[j].status = "notAgree"
                    console.log(orders[i].pharmaciesId)
                }
            }
        }
        //  const _id=decoded._id;
        // if(orders.customerId==id){

        // }

    } catch (error) {
        res.json({ msg: "error in token", error });
    }

    //     })

}