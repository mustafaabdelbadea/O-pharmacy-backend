const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.pharmacySignup = async (req, res) => {

  console.log(req.body);
  //assign data in variables to save it 
  let { name,
    email,
    password,
    confirmPassword,
    phones,
    locationAsAddress,
    locationAsCoordinates: {
      coordinates: {
        lat, lon
      }

    } } = req.body;

  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {


    const pharmacy = await pharmaciesModel.findOne({ email }); // search if email exist in data base
    //console.log(pharmacy);
    if (pharmacy) {
      res.json({message:"Email is already exist"})// if email exist
    }
    else {// if email not exist will hash password and save info in database and print success

      bcrypt.hash(password, 8, async (err, hashPassword) => {
        let pharmacy = new pharmaciesModel({
          name,
          email,
          password: hashPassword,
          phones,
          locationAsAddress,
          locationAsCoordinates: {
            coordinates: {
              lat, lon
            }

          }
        })

        try {
          await pharmacy.save();
          jwt.sign(pharmacy.email,      //retrieve in token    
            "pharmjwt",         //secret key pharmjwt

            //send virifay mail
            async (err, token) => {
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "OpharmacyTeam@gmail.com", // generated ethereal user
                  pass: "OPharmacy@123", // generated ethereal password
                },
              });

              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: '"O-Pharmacy" <OpharmacyTeam@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "Verify mail", // Subject line
                text: "Verify your mail", // plain text body
                html: `  
                
                
            <div style=" color: #fff; background-color: #343A40; width: 50%; margin: auto; text-align: center; padding: 1.5rem; font-size: 1.5rem;  ">            
                <!-- <img style="width: 10rem; height: 10rem;margin-bottom: 1.5rem;" src="./checkmark-for-verification (1).svg" alt=""><br> -->
                <h3 class="text-white mb-4" >Verify this email address</h3>
                <p style="margin-bottom: 1.5rem;"> Tap the button below to Verify your account </p>
                <a href="http://localhost:4200/pharmacyVerifyEmail/${token}"><button type="button" style="cursor: pointer; color: #fff; background-color: rgb(40,167,69); margin-bottom: 1.2rem; border: transparent ; border-radius: 1rem; padding: 1rem;" >verify</button> </a>
            
                <p style="margin-bottom: 1.5rem; font-size: medium;color:#000"> Thank you for joining us. <br> <span style="font-size: large; font-weight: bold;">O-Pharmacy</span> hope you enjoy your account.</p>
                  
            </div>
      
          `, // html body

              }, (error) => {

                if (error)
                  console.log(error);
                else
                  console.log("email sent");
              });
            }
          )
          res.json({ message: "Success" })
        }
        catch (e) {// print error if it exist
          res.json({message:e})
        }

      });
    }
    // const match = await bcrypt.compare(password, pharmacy.passwordHash);
  } else {
    res.json({ message: 'enter valid data',errors });
  }


}


module.exports.customerSignup = async (req, res) => {

  console.log(req.body);

  //assign data in variables to save it 
  let { name,
    email,
    password,
    confirmPassword,
    phone,
    locationAsAddress,
    locationAsCoordinates: {
      coordinates: {
        lat, lon
      }
    },
    birthDate,
    gender } = req.body


  const errors = validationResult(req); //check input validation
  console.log(errors);
  if (errors.isEmpty()) {
    const customerEmail = await customersModel.findOne({ email });// search if email exist in data base
    const customerPhone = await customersModel.findOne({ phone });// search if phone exist in data base
    // console.log(customer);
    if (customerEmail) {
      res.json({message:"Email is already exist"})// if email exist
    }
    else {// if email not exist will check for the phone hash password and save info in database and print success
      if (customerPhone) {
        res.json({message:"Phone is already exist"}) // if phone exist
      }
      else {   // if email and phone not exist will hash password and save info in database and print success

        bcrypt.hash(password, 8, async (err, hashPassword) => {
          let customer = new customersModel({
            name,
            email,
            password: hashPassword,
            phone,
            locationAsAddress,
            locationAsCoordinates: {
              coordinates: {
                lat, lon
              }
            },
            birthDate,
            gender
          })

          try {
            await customer.save();
            jwt.sign(customer.email,      //retrieve in token    
              "pharmjwt",         //secret key pharmjwt

              //send virifay mail
              async (err, token) => {
                let transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "OpharmacyTeam@gmail.com", // generated ethereal user
                    pass: "OPharmacy@123", // generated ethereal password
                  },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: '"O-Pharmacy" <OpharmacyTeam@gmail.com>', // sender address
                  to: req.body.email, // list of receivers
                  subject: "Verify mail", // Subject line
                  text: "Verify your mail", // plain text body
                  html: `     
              
              <div style=" color: #fff; background-color: #343A40; width: 50%; margin: auto; text-align: center; padding: 1.5rem; font-size: 1.5rem;  ">            
              <!-- <img style="width: 10rem; height: 10rem;margin-bottom: 1.5rem;" src="./checkmark-for-verification (1).svg" alt=""><br> -->
              <h3 class="text-white mb-4" >Verify this email address</h3>
              <p style="margin-bottom: 1.5rem;"> Tap the button below to Verify your account </p>
              <a href="http://localhost:4200/customerVerifyEmail/${token}"><button type="button" style="cursor: pointer; color: #fff; background-color: rgb(40,167,69); margin-bottom: 1.2rem; border: transparent ; border-radius: 1rem; padding: 1rem;" >verify</button> </a>
          
              <p style="margin-bottom: 1.5rem; font-size: medium;color:#000"> Thank you for joining us. <br> <span style="font-size: large; font-weight: bold;">O-Pharmacy</span> hope you enjoy your account.</p>
                
          </div>
       
           `, // html body

                }, (error) => {

                  if (error)
                    console.log(error);
                  else
                    console.log("email sent");
                });
              }
            )
            res.json({ message: "Success" })
          }
          catch (e) {// print error if it exist
            res.json({message:e})
          }

        });
      }
      // const match = await bcrypt.compare(password, customer.passwordHash);
    }
  }

  else {
    res.json({ message: 'Enter valid data' ,errors});
  }
}

