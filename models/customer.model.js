const mongoose=require('mongoose');
let customerSchema=mongoose.Schema({

    name:{type:String,required:true},

    email:{type:String,required:true,unique:true},

    password:{type:String,required:true},

    isVerifed:{type:Boolean,required:true,defult:false},

    phone:{type:String,required:true,unique:true},

    locationAsAderss:{type:String,required:true},

    locationAsCoordinates:{type:String,required:true},

    birthDate:{type:Date,required:true},

    age:{type:String,required:true},

    gander:{type:String,required:true},

    photo:{type:String,required:false},

    role:{type:String,required:true,defult:"customer"}

})


module.exports=mongoose.model('customer',customerSchema)
