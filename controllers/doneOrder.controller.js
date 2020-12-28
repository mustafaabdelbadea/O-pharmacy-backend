const ordersModel = require('../models/orders.model');

module.exports.doneOrder = async (req, res) => 
{
    // orderId = req.params.orderId; //assign the spcific order id to variable
    orderId = req.body.orderId;

    try {
        Order = await ordersModel.findOne({_id:orderId});// search for this order in database
        if (Order) {  //order is found
            if (Order.globalStatus == "Accepted")  //if order accepted 
            {
                try
                {
                    await ordersModel.findOneAndUpdate({_id:orderId},{globalStatus:"done"}); // done orde
                    res.json({msg:"order done"});
                }
                catch(error)
                {
                    res.json(error);
                }
            }
            else
                if (Order.globalStatus == "canceled") {
                    res.json({msg:"this order was canceled"}); //order was canceled
                }
                else if (Order.globalStatus == "notAccepted") {
                    
                    res.json({msg:"this order doesn't Accepted you shoud Accept it frist to done it"});
                }
            
        } else {
            res.json({msg:"order not found"});
        }

        }
    catch(error)
        {
            res.json(error);
        }
            

}