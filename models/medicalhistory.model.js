const { text } = require('body-parser');
const mongoose = require('mongoose');


let medicalhistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    doYouHaveDiabates: { type: Boolean, required: false },

    highBloodPreasure: { type: Boolean, required: false },

    highCholesterol: { type: Boolean, required: false },

    doYouSmoke: { type: Boolean, required: false },

    doYouVape: { type: Boolean, required: false },

    doYouDrinkAlcohol: { type: Boolean, required: false },

    doYouUseDrugs: { type: Boolean, required: false },

    doYouExercize: { type: Boolean, required: false },

    whatIsYourMaritalStatus: { type: String, required: false },

    bloodType: { type: String, required: false },

    doYouHaveOtherHealthConditions: { type: String, required: false },

    patientConcerns: { type: String, required: false },//concerns list that patient want to talk about during his visit


    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "customer",required:true }//relation between customer and history

})


module.exports = mongoose.model('medicalhistory', medicalhistorySchema)