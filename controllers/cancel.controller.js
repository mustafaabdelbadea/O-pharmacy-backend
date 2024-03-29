const { json } = require('body-parser');
const ordersModel = require('../models/orders.model');


module.exports.cancelOrder = async (req, res) => {

   // orderId = req.params.orderId; //assign the spcific order id to variable
    orderId = req.body.orderId;
    try {
        Order = await ordersModel.findOne({_id:orderId})// search for this order in database
        if (Order) // if order found
          {
            if (Order.globalStatus == "accepted") // if order was accpted by pharmacy 
            {  try {
                    await ordersModel.findOneAndUpdate({_id:orderId},{globalStatus:"canceled"}); // update globalStatus to canceled 
                    res.json({message:" order canceled"})
                } 
                catch (error) // get errors
                {
                    console.log(error);  
                    res.json(error); 
                }               
            }
            else if (Order.globalStatus == "notAccepted") // if order was not accpted by pharmacy 
            {
                try {
                    await ordersModel.findOneAndRemove({_id:orderId}); // delete order from database
                    res.json({message:" order canceled and deleted"})
                    }
                catch(error)// get errors
                    {
                    console.log(error);    
                    res.json(error)
                    }    
            }
          else if (Order.globalStatus == "canceled") //if order was recanty canceled
          {  
            res.json({message:" order already canceled"})   
          }
          else if (Order.globalStatus == "done") //if order was recanty canceled
          {  
            res.json({message:"this order done you can't cancel it"})   
          }
        }
        else{ 
            res.json({message:"order not found"}) // condtion if order not found
        }

    } catch (error) // get errors
    {
        console.log(error);
        res.json(error)
    }

}