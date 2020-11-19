const bcrypt = require("bcrypt");

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
       res.json({massege:"success"})
    }catch(e)
    {// print DB error if it exist
       res.json(e)
    }  
    
  });

   // const match = await bcrypt.compare(password, customer.passwordHash);
  }
}



}

