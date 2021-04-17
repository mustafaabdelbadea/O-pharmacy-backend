const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");
module.exports.forgotPasswordCustomer = async (req, res) => {
    //check if email exists or not
    const email = req.body.email;
    const customers = await customersModel.findOne({ email });
    //get date to make expired date for token
    const DateNow=Date.now();
    if (customers) {
        //encode email and date 
        jwt.sign({email,DateNow},      //retrieve in token    
            "pharmjwt",
            async (err, token) => {
                //send email to user 
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "OpharmacyTeam@gmail.com", // generated ethereal user
                        pass: "OPharmacy@123", // generated ethereal password
                    },
                });
                let info = await transporter.sendMail({
                    from: '"O-Pharmacy" <OpharmacyTeam@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "reset password", // Subject line
                    text: "reset your password", // plain text body
                    html: ` 
                    <div style="background-color: #f3f8ff; width: 50%; margin: auto; text-align: center; padding: 1.5rem; font-size: 1.5rem;  ">
        
                    <!-- <img style="width: 10rem; height: 10rem;margin-bottom: 1.5rem;" src="./padlock.svg" alt=""><br>        -->
                     <h3 style="margin: auto;color:#000" >Reset your password</h3>
             
                     <h5 style="color:#000" >we received a request to reset your password</h5>
             
                     <p style="margin-bottom: 1.5rem;color:#000"> tap the button below to make new password </p>
             
                     <a href="http://localhost:4200/customerForgotPassword/${token}"><button type="button" style="cursor: pointer; color: #fff; background-color: rgb(40,167,69); margin-bottom: 1.2rem; border: transparent ; border-radius: 1rem; padding: 1rem;" >reset password</button> </a>
             
                     <p style="margin-bottom: 1.5rem; font-size: medium;color:#000"> Thank you for joining us. <br> <span style="font-size: large; font-weight: bold;">O-Pharmacy</span> hope you enjoy your account.</p>
                       
                 </div>         
                    
                    `, // html body
                }
                    , (error) => {

                        if (error) {
                            console.log(error)
                            res.json(error);

                        }
                        else {
                            res.json({message:"Email Sent"});
                        }

                    });
            })
    }
    else {
        res.json({message:'Email Not Found'});
    }
}




module.exports.forgotPasswordPharmacy = async (req, res) => {
    //check if email exists or not
    const email = req.body.email;
    const pharmacies = await pharmaciesModel.findOne({ email });
    //get date to make expired date for token
    const DateNow=Date.now();
    if (pharmacies) {
        //encode email and date 
        jwt.sign({email,DateNow},      //retrieve in token    
            "pharmjwt",
            async (err, token) => {
                //send email to user 
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "OpharmacyTeam@gmail.com", // generated ethereal user
                        pass: "OPharmacy@123", // generated ethereal password
                    },
                });
                let info = await transporter.sendMail({
                    from: '"O-Pharmacy" <OpharmacyTeam@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "reset password", // Subject line
                    text: "reset your password", // plain text body
                    html: ` 
                
            <div style="  background-color: #f3f8ff; width: 50%; margin: auto; text-align: center; padding: 1.5rem; font-size: 1.5rem;  ">
                    
            <!-- <img style="width: 10rem; height: 10rem;margin-bottom: 1.5rem;" src="./padlock.svg" alt=""><br>        -->
            <h3 style="margin: auto; color:#000" >Reset your password</h3>

            <h5 style="color:#000" >we received a request to reset your password</h5>

            <p style="margin-bottom: 1.5rem;color:#000"> tap the button below to make new password </p>

            <a href="http://localhost:4200/pharmacyForgotPassword/${token}"><button type="button" style="cursor: pointer; color: #fff; background-color: rgb(40,167,69); margin-bottom: 1.2rem; border: transparent ; border-radius: 1rem; padding: 1rem;" >reset password</button> </a>

            <p style="margin-bottom: 1.5rem; font-size: medium;color:#000"> Thank you for joining us. <br> <span style="font-size: large; font-weight: bold;">O-Pharmacy</span> hope you enjoy your account.</p>
            
            </div>
                    
                    `, // html body
                }
                    , (error) => {

                        if (error) {
                             res.json(error);

                        }
                        else {
                            res.json({message:"Email Sent"});
                        }

                    });
            })
    }
    else {
        res.json({message:'Email Not Found'});
    }
}




