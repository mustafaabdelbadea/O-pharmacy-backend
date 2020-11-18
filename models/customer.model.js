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

    age:{type:string,require:true},

    gander:{type:string,require:true},

    photo:{type:string,require:true}

})


const customerSchema=mongoose.model('customer',customerSchema)

module.exports=customerSchema