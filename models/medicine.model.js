const mongoose = require('mongoose');


let medicineSchema = mongoose.Schema({
   
    medicineName: { type: String, required: false },
    price: { type: Number, required: false },


})


module.exports = mongoose.model('medicine', medicineSchema)