const mongoose = require('mongoose');


let pharmacySchema = mongoose.Schema({

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

    phones: [
        {
            type: Number,
            required: true
        }
    ],

    locationAsAddress: {
        type: String, required: true
    },
    // locationAsCoordinates:{type:String,required:true},
    locationAsCoordinates: {
        type:
        {
            type: String, default: 'Point'
        },
        coordinates: String
    },
    // locationAsCoordinates :{ type: [Number], index: { type: '2dsphere', sparse: true },
    rate: {
        type: Number,
        required: false
    },

    logo: {
        type: String,
        required: false
    },

    role: {
        type: String,
        required: true,
        default: "pharmacy"
    }


})


module.exports = mongoose.model('pharmacy', pharmacySchema)
