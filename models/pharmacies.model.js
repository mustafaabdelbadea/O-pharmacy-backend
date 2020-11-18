const mongoose=require('mongoose');


let pharmacySchema=mongoose.Schema({

    name:{type:String,require:true},

    email:{type:String,require:true,unique:true},

    password:{type:String,require:true},

    isVerifed:{type:Boolean,require:true,defult:false},

    phones:{type:Array,require:true},

    locationAsAderss:{type:String,require:true},

    locationAsCoordinates:{type:String,require:true},

    rate:{type:Number,require:false},

    logo:{type:String,require:false}


})


module.exports=mongoose.model('pharmacy',pharmacySchema)
