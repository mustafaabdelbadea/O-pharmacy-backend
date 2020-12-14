const mongoose = require('mongoose');
let customerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    locationAsAddress: {
        type: String,
        required: true
    },

    locationAsCoordinates: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            lat:String,
            lon:String
        }
    },

    birthDate: {
        type: Date,
        required: true
    },

    gander: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: false
    },

    role: {
        type: String,
        required: true,
        default: "customer"
    }

})


module.exports = mongoose.model('customer', customerSchema)
