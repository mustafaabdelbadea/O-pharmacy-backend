const mongoose=require('mongoose');


let customerSchema=mongoose.Schema({

    name:{type:String,require:true},

    email:{type:String,require:true,unique:true},

    password:{type:String,require:true},

    isVerifed:{type:Boolean,require:true,defult:false},

    phone:{type:String,require:true},

    locationAsAderss:{type:String,require:true},

    locationAsCoordinates:{type:String,require:true},

    birthDate:{type:Date,require:true},

    age:{type:String,require:true},

    gander:{type:String,require:true},

    photo:{type:String,require:false}

})


module.exports=mongoose.model('customer',customerSchema)
