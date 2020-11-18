const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken')
//import models 
const pharmaciesModel=require('../models/pharmacies.model');
const customerModel=require('../models/customer.model');
module.exports.pharmacySignin=async (req,res)=>{
let {email,password}=req.body;        
    let pharmacies=await pharmaciesModel.findOne({email});
        if(pharmacies){
            //check if email is verified or not 
            if(pharmacies.isVerified==false){
                res.json({message:"email not Verified"});
           }
           // check hased password
           const match =await bcrypt.compare(password,pharmacies.password)
            if(match){
                jwt.sign(
                    //retrieve in token 
                    {
                        _id:pharmacies._id,
                        name:pharmacies.name,
                        isVerified:pharmacies.isVerified,
                        phones:pharmacies.phones,
                        locationAsAderss:pharmacies.locationAsAderss,
                        locationAsCoordinates:pharmacies.locationAsCoordinates,
                        rate:pharmacies.rate
                    },
                    //secret key pharmjwt
                    "pharmjwt",
                    //send token in header
                    (err,token)=>{
                        res.header('token',token).json(
                            {
                                name:pharmacies.name
                            }
                        )
                    }
                )
                // res.json({msg:"success"});
            }
            else{
                res.json({msg:"Invalid email or password"});
            }
        }
        else{
             res.json({msg:"Invalid email or password"});
        }
}
module.exports.customerSignin=async(req,res)=>{
    let {email,password}=req.body;        
        let customers=await customerModel.findOne({email});
            if(customers){
                //check if email is verified or not 
                if(customers.isVerified==false){
                    res.json({message:"email not Verified"});
               }
               // check hased password
               const match =await bcrypt.compare(password,customers.password)
                if(match){
                    jwt.sign(
                        //retrieve in token 
                        {_id:customers._id,name:customers.name,password:customers.password},
                        //secret key pharmjwt
                        "pharmjwt",
                        //send token in header
                        (err,token)=>{
                            res.header('token',token).json(
                                {
                                    name:customers.name
                                }
                            )
                        }
                    )
                    // res.json({msg:"success"});
                }
                else{
                    res.json({msg:"Invalid email or password"});
                }
            }
            else{
                 res.json({msg:"Invalid email or password"});
            }
}

// module.exports.check=async(req,res)=>{
//     jwt.verify(req.params.token,'checkEmail',async(err,decoded)=>{
//        let user=await userModel.findOneAndUpdate({email:decoded},{confirmed:true})
// res.redirect('/');
//     });
// }
module.exports.home=async(req,res)=>{
    let customers=await customerModel.findOne({});
     res.json(customers);
}