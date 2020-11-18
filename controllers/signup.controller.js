const bcrypt = require("bcrypt");

const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.pharmacySignup=async (req,res)=>{

    console.log(req.body);

let {name,email,password,confirmPassword,phones,locationAsAderss,locationAsCoordinates} = req.body;

try{
  const pharmacy = await pharmaciesModel.findOne({ email }); // search if email exist in data base
  console.log(pharmacy);
  if (pharmacy) {res.json("email is alrady exist")// if email exist
  } 
  else 
  { // if email not exist will hash password and save info in database and print success
    bcrypt.hash(password, 8, async function (err, hashPassword) {
     let pharmacy = new pharmaciesModel({name,email,password: hashPassword,phones,locationAsAderss,locationAsCoordinates})
     await pharmacy.save();
     res.json({massege:"success"})         
   });
   // const match = await bcrypt.compare(password, pharmacy.passwordHash);
  }
}catch(e)
{// print error if it exist
  res.json(e)
}
}
 
    
module.exports.customerSignup=async(req,res)=>{

    console.log(req.body);

let {name,email,password,confirmPassword,phone,locationAsAderss,locationAsCoordinates,birthDate,gander} = req.body

try{
  const customer = await customersModel.findOne({ email });// search if email exist in data base
  console.log(customer);
  if (customer) {res.json("email is alrady exist")// if email exist
  } 
  else 
  { // if email not exist will hash password and save info in database and print success
    bcrypt.hash(password, 8, async function (err, hashPassword) {
     let customer = new customersModel({name,email,password: hashPassword,phone,locationAsAderss,locationAsCoordinates,birthDate,gander})
     await customer.save();
     res.json({massege:"success"})         
   });
   // const match = await bcrypt.compare(password, customer.passwordHash);
  }

}catch(e)
{// print error if it exist
  res.json(e)
}


}

