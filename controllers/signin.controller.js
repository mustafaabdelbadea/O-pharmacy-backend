const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
//import models 
const { check, validationResult } = require("express-validator");
const pharmaciesModel = require('../models/pharmacies.model');
const customerModel = require('../models/customer.model');
const { Mongoose } = require('mongoose');
module.exports.pharmacySignin = async (req, res) => {
    let { email, password } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
        let pharmacies = await pharmaciesModel.findOne({ email });
        if (pharmacies) {
        
            // check hased password
            const match = await bcrypt.compare(password, pharmacies.password)
            if (match) {
                    //check if email is verified or not  
                    if (pharmacies.isVerified == false) {

                        jwt.sign({  isVerified:pharmacies.isVerified
                        },"pharmjwt",(err,token)=>{
                            res.json({ message: "email not Verified",token:token });
        
                        }
                        )
                    }
                jwt.sign(
                    //retrieve in token 
                    {
                        _id: pharmacies._id,
                        name: pharmacies.name,
                        phones: pharmacies.phones,
                        email:pharmacies.email,
                        locationAsAderss: pharmacies.locationAsAderss,
                        locationAsCoordinates: pharmacies.locationAsCoordinates,
                        rate: pharmacies.rate,
                        
                        verified:pharmacies.isVerified,
                        isVerified:pharmacies.isVerified
                    },
                    //secret key pharmjwt
                    "pharmjwt",
                    //send token in header
                    (err, token) => {
                        // res.header('token', token).json(
                        //     {
                        //         name: pharmacies.name
                        //     }
                        // )
                        res.json({message:'success',token:token,logo:pharmacies.logo});
                    }
                )
               //  res.json({message:"success"});
            }
            else {
                res.json({ message: "Invalid email or password" });
            }
        }
        else {
            res.json({ message: "Invalid email or password" });
        }
    }
    else {
        res.json({ message: 'enter valid data' });

    }
}
module.exports.customerSignin = async (req, res) => {
    let { email, password } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
        let customers = await customerModel.findOne({ email });
        if (customers) {
       
            // check hased password
            const match = await bcrypt.compare(password, customers.password)
            if (match) {
              //check if email is verified or not 
            if (customers.isVerified == false) {

                jwt.sign({  isVerified:customers.isVerified
                },"pharmjwt",(err,token)=>{
                    res.json({ message: "email not Verified",token:token });

                }
                )
            }
                try {


                    jwt.sign(
                        //retrieve in token 
                        {
                            _id: customers._id,
                            name: customers.name,
                            email:customers.email,
                            phone:customers.phone,
                            locationAsAddress:customers.locationAsAddress,
                            locationAsCoordinates:customers.locationAsCoordinates,
                            birthDate:customers.birthDate,
                            age :Math.floor((Date.now() - new Date(customers.birthDate)) / 1000 / 60 / 60 / 24 / 365),
                            gender:customers.gender,
                            verified:customers.isVerified,
                            isVerified:customers.isVerified

                        },
                        //secret key pharmjwt
                        "pharmjwt",
                        //send token in header
                        (err, token) => {
                            // res.header('token', token).json(
                            //     {
                            //         name: customers.name
                            //     }
                            // )
                             res.json({message:'success',token:token,photo:customers.photo});
                        }
                    )
                }
                catch (error) {
                    console.log(error)
                }
               //  res.json({message:"success",Test:'test'});
            }
            else {
                res.json({ message: "Invalid email or password" });
            }
        }
        else {
            res.json({ message: "Invalid email or password" });
        }
    }
    else {
        res.json({ message: 'enter valid data' });

    }
}

// module.exports.check=async(req,res)=>{
//     jwt.verify(req.params.token,'checkEmail',async(err,decoded)=>{
//        let user=await userModel.findOneAndUpdate({email:decoded},{confirmed:true})
// res.redirect('/');
//     });
// }
module.exports.home = async (req, res) => {

    // pharmaciesModel.find(
    //     {
    //         locationAsCoordinates:
    //         { $near:
    //            {
    //              $geometry: { type: "Point",  coordinates: [ 29.977607600000002, 31.090821799999997] },
    //              $minDistance: 1000,
    //              $maxDistance: 5000
    //            }
    //         }
    //     }
    //  )

    //erquation to calculate date
    let customers = await customerModel.findOne({});
    // let age = Math.floor((Date.now() - new Date(customers.birthDate)) / 1000 / 60 / 60 / 24 / 365);
    // console.log(age)
    res.json(customers);
}




module.exports.pharmacyPrivilege = async (req, res) => {
    let { email, password } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
        let pharmacies = await pharmaciesModel.findOne({ email });
        if (pharmacies) {
            // check hased password
            const match = await bcrypt.compare(password, pharmacies.password)
            if (match) {
                jwt.sign(
                    //retrieve in token 
                    {
                        privilege:true
                    },
                    //secret key pharmjwt
                    "pharmjwt",
                    //send token in header
                    (err, token) => {
                        // res.header('token', token).json(
                        //     {
                        //         name: pharmacies.name
                        //     }
                        // )
                        res.json({message:'success',tokenPrivilege:token});
                    }
                )
               //  res.json({message:"success"});
            }
            else {
                res.json({ message: "Invalid password" });
            }
        }
        else {
            res.json({ message: "Invalid email or password" });
        }
    }
    else {
        res.json({ message: 'enter valid data' });

    }
}