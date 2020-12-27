const { text } = require('body-parser');
const mongoose = require('mongoose');


let ordersSchema = mongoose.Schema({
  
    date: {
        type: Date, 
        
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
    rate:{
        type:Number,
        required:true,
        default:null
    },
   globalStatus:{
       type:String,
        default:"notAccepted",
        required: true
   },

    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "customer",required:true },//relation between customer and orders

    pharmaciesID:[ { 
       id:{ type: mongoose.Schema.Types.ObjectId, ref: "pharmacies",required:true},
       status:{type: String , required: true ,default: "active"}
     } ] //relation between pharmacies and orders
})


module.exports = mongoose.model('orders', ordersSchema)