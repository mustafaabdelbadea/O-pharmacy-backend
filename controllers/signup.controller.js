const usersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.pharmacySignup=async (req,res)=>{

    console.log(req.body);

let {name,email,password,confirmPassword,phones,locationAsAderss,locationAsCoordinates} = req.body;

try{

  let pharmacy = new pharmaciesModel({name,email,password,phones,locationAsAderss,locationAsCoordinates})
  await pharmacy.save();
  res.json({massege:"success"})

}catch(e)
{
  res.json(e)
}


let {name,email,password,confirmPassword,phones,locationAsAderss,locationAsCoordinates} = req.body;

//   if (errors.isEmpty()) {
//     const user = await indexModel.findOne({ email });
//     console.log(user);
//     if (user) {
//       res.render("signup", {
//         pageTitle: "SignUp",
//         MessageError: [{ param: "exists" }],
//         isLoggedIn:false,
//         oldInputs: { name, email, password, confirmPassword },
//       });
//     } else {
//       bcrypt.hash(password, 8, function (err, hashPassword) {
//         indexModel.insertMany({ name, email, password: hashPassword });
//         res.redirect("/signin");
//       });
//       // const match = await bcrypt.compare(password, user.passwordHash);
//     }
//   } else {
//     res.render("signup", {
//       pageTitle: "SignUp",
//       isLoggedIn:false,
//       MessageError: errors.array(),
//       oldInputs: { name, email, password, confirmPassword },
//     });
//   }




}
 
    
module.exports.customerSignup=async(req,res)=>{

    console.log(req.body);

let {name,email,password,confirmPassword,phones,locationAsAderss,locationAsCoordinates,birthDate,gander} = req.body

try{

  let customer = new usersModel({name,email,password,phones,locationAsAderss,locationAsCoordinates,birthDate,gander})
  await customer.save();
  res.json({massege:"success"})

}catch(e)
{
  res.json(e)
}


}

