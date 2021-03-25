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
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: ` <a href="http://localhost:4200/customerForgotPassword/${token}">click to confirm</a>`, // html body
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
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: ` <a href="http://localhost:4200/pharmacyForgotPassword/${token}">click to confirm</a>`, // html body
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




