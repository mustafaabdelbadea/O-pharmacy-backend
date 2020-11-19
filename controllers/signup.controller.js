const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');
const nodemailer = require("nodemailer");
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.pharmacySignup=async (req,res)=>{

    console.log(req.body);
//assign data in variables to save it 
let {name,email,password,confirmPassword,phones,locationAsAddress,locationAsCoordinates} = req.body;


  const pharmacy = await pharmaciesModel.findOne({ email }); // search if email exist in data base
  //console.log(pharmacy);
  if (pharmacy) {res.json("email is alrady exist")// if email exist
  } 
  else 
  {// if email not exist will hash password and save info in database and print success

    bcrypt.hash(password, 8, async (err, hashPassword)=> {
     let pharmacy = new pharmaciesModel({name,email,password: hashPassword,phones,locationAsAddress,locationAsCoordinates})
     
try{
     await pharmacy.save();
     jwt.sign(pharmacy.email,      //retrieve in token    
              "pharmjwt",         //secret key pharmjwt
      
      //send virifay mail
      async(err,token)=>{
        let transporter = nodemailer.createTransport({
          service:"gmail",
          auth: {
            user: "3bdallhmz99@gmail.com", // generated ethereal user
            pass: "", // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo" <3bdallhmz99@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `
        
          <div style="background-color:#000;color:#fff; padding:100px">
          
        <h1 style="margin:50px"> <a href="http://${req.headers.host}/pharmacyVerifyEmail/${token}">click to confirm</a>  </h1>
          
          </div>
      
      
          `, // html body
          
        },(error)=>{
          
          if(error)
            console.log(error);
          else
           console.log("email sent");   
        });
      }
  )
     res.json({massege:"success"}) 
    }
catch(e)
     {// print error if it exist
       res.json(e)
     }        

    });
   // const match = await bcrypt.compare(password, pharmacy.passwordHash);
  }


}
 
    
module.exports.customerSignup=async(req,res)=>{

    console.log(req.body);

    //assign data in variables to save it 
let {name,email,password,confirmPassword,phone,locationAsAddress,locationAsCoordinates,birthDate,gander} = req.body


  const customerEmail = await customersModel.findOne({ email });// search if email exist in data base
  const customerPhone = await customersModel.findOne({ phone });// search if phone exist in data base
  // console.log(customer);
  if (customerEmail) {res.json("email is alrady exist")// if email exist
  } 
  else 
  {// if email not exist will check for the phone hash password and save info in database and print success
   if(customerPhone)
   {
    res.json("phone is alrady exist") // if phone exist
   }
   else
   {   // if email and phone not exist will hash password and save info in database and print success
    
    bcrypt.hash(password, 8, async (err, hashPassword)=> {
     let customer = new customersModel({name,email,password: hashPassword,phone,locationAsAddress,locationAsCoordinates,birthDate,gander})
    
     try{
      await customer.save();
      jwt.sign(customer.email,      //retrieve in token    
               "pharmjwt",         //secret key pharmjwt
       
       //send virifay mail
       async(err,token)=>{
         let transporter = nodemailer.createTransport({
           service:"gmail",
           auth: {
             user: "3bdallhmz99@gmail.com", // generated ethereal user
             pass: "amz4121099mz**", // generated ethereal password
           },
         });
       
         // send mail with defined transport object
         let info = await transporter.sendMail({
           from: '"Fred Foo" <3bdallhmz99@gmail.com>', // sender address
           to: req.body.email, // list of receivers
           subject: "Hello ✔", // Subject line
           text: "Hello world?", // plain text body
           html: `
         
           <div style="background-color:#000;color:#fff; padding:100px">
           
         <h1 style="margin:50px"> <a href="http://${req.headers.host}/customerVerifyEmail/${token}">click to confirm</a>  </h1>
           
           </div>
       
       
           `, // html body
           
         },(error)=>{
           
           if(error)
             console.log(error);
           else
            console.log("email sent");   
         });
       }
   )
      res.json({massege:"success"}) 
     }
 catch(e)
      {// print error if it exist
        res.json(e)
      }  
    
  });

   // const match = await bcrypt.compare(password, customer.passwordHash);
  }
}



}

