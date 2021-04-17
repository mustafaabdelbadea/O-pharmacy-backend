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
                    
                    
                    <html>
                    <head>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    </head>
                    <style>
                     
                    </style>
                <body>
                
                    <!-- style="background-color: #f3f8ff;"  -->
                
                    <div style="background-color: #f3f8ff;" class=" w-50 mt-2 m-auto text-center p-3 rounded">
                        
                        <img class="mb-2" style="width: 10rem; height: 10rem;" src="../assetspadlock.svg" alt=""><br>
                        <h3 class=" mb-4" >Reset your password</h3>
                
                        <h5>we received a request to reset your password</h5>
                
                        <p class=" mb-4"> tap the button below to make new password </p>
                
                        <a type="button" class="btn btn-success mb-4" href="http://localhost:4200/customerForgotPassword/${token}">reset password</a>
                
                        <p class=" mb-4"> Thank you for joining us. <br> <span style="font-size: large; font-weight: bold;">O-Pharmacy</span> hope you enjoy your account.</p>
                          
                    </div>
                
                
                    
                
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                
                </body>
                </html>
                                    
                    
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
                    
                    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <style>
     
    </style>
<body>

    <!-- style="background-color: #f3f8ff;"  -->

    <div style="background-color: #f3f8ff;" class=" w-50 mt-2 m-auto text-center p-3 rounded">
        
        <img class="mb-2" style="width: 10rem; height: 10rem;" src="../assets/padlock.svg" alt=""><br>
        <h3 class=" mb-4" >Reset your password</h3>

        <h5>we received a request to reset your password</h5>

        <p class=" mb-4"> tap the button below to make new password </p>

        <a type="button" class="btn btn-success mb-4" href="http://localhost:4200/pharmacyForgotPassword/${token}">reset password</a>

        <p class=" mb-4"> Thank you for joining us. <br> <span style="font-size: large; font-weight: bold;">O-Pharmacy</span> hope you enjoy your account.</p>
          
    </div>


    

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</body>
</html>

                    
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




