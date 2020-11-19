const mongoose=require('mongoose');


let pharmacySchema=mongoose.Schema({

    name:{type:String,required:true},

    email:{type:String,required:true,unique:true},

    password:{type:String,required:true},

    isVerified:{type:Boolean,required:true,defult:false},

    phones:[{type:Number,required:true}],

    locationAsAderss:{type:String,required:true},

    locationAsCoordinates:{type:String,required:true},

    rate:{type:Number,required:false},

    logo:{type:String,required:false},

    role:{type:String,required:true,defult:"pharmacy"}


})


module.exports=mongoose.model('pharmacy',pharmacySchema)
