const { text } = require('body-parser');
const mongoose = require('mongoose');


let ordersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    date: {
        type: date, 
        
        required: true
     },

    messages: { 
        
        type: String,
        
        required: false
     },

    orderByTexting: { 
        
        type: String, 
        
        required: false 
    },

    orderByPhoto: { 
       
        type: String, 
        
        required: false
     },

    location: { 
        
        type: String, 
        
        required: false 
    }, //pharmacy Address

    destination: { 
        
        type: String, 
        
        required: false 
    }, //customer Address

   

    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "customer",required:true },//relation between customer and orders

    pharmaciesID: { type: mongoose.Schema.Types.ObjectId, ref: "pharmacies",required:true }//relation between pharmacies and orders
})


module.exports = mongoose.model('orders', ordersSchema)