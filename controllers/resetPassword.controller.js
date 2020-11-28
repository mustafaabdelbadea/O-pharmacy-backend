const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");
module.exports.resetPasswordCustomer = async (req, res) => {
    const email = req.body.email;
    const customers = await customersModel.findOne({ email });
    const DateNow=Date.now();
    if (customers) {
        jwt.sign({email,DateNow},      //retrieve in token    
            "pharmjwt",
            async (err, token) => {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "test@test.com", // generated ethereal user
                        pass: "TEst@123", // generated ethereal password
                    },
                });
                let info = await transporter.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: ` <a href="http://${req.headers.host}/customerResetPassword/${token}">click to confirm</a>`, // html body
                }
                    , (error) => {

                        if (error) {
                            console.log(error);

                        }
                        else {
                            res.json("Email Sent");
                        }

                    });
            })
    }
    else {
        res.json('Email not found');
    }
}







// module.exports.pharmacyEmail = async (req, res) => {
//   jwt.verify(req.params.token, "pharmjwt", async (err, decodded) => {
//     //console.log(decodded);
//     await pharmaciesModel.findOneAndUpdate(
//       { email: decodded },
//       { isVerified: true }
//     );

//     res.redirect("/");
//   });

// };

