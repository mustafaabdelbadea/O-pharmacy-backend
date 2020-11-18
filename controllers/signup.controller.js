const bcrypt = require("bcrypt");

const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.pharmacySignup=async (req,res)=>{

    console.log(req.body);

let {name,email,password,confirmPassword,phones,locationAsAderss,locationAsCoordinates} = req.body;

try{
  const pharmacy = await pharmaciesModel.findOne({ email });
  console.log(pharmacy);
  if (pharmacy) {res.json("email is alrady exist")
  } 
  else 
  {
    bcrypt.hash(password, 8, async (err, hashPassword)=> {
     let pharmacy = new pharmaciesModel({name,email,password: hashPassword,phones,locationAsAderss,locationAsCoordinates})
     await pharmacy.save();
     res.json({massege:"success"})         
   });
   // const match = await bcrypt.compare(password, pharmacy.passwordHash);
  }

}catch(e)
{
  res.json(e)
}
}
 
    
module.exports.customerSignup=async(req,res)=>{

    console.log(req.body);

let {name,email,password,confirmPassword,phone,locationAsAderss,locationAsCoordinates,birthDate,gander} = req.body

try{
  const customer = await customersModel.findOne({ email });
  console.log(customer);
  if (customer) {res.json("email is alrady exist")
  } 
  else 
  {
    bcrypt.hash(password, 8, async (err, hashPassword)=> {
     let customer = new customersModel({name,email,password: hashPassword,phone,locationAsAderss,locationAsCoordinates,birthDate,gander})
     await customer.save();
     res.json({massege:"success"})         
   });
   // const match = await bcrypt.compare(password, customer.passwordHash);
  }

}catch(e)
{
  res.json(e)
}


}

