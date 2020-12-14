const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");


module.exports.edit_Pharmacy_password = async (req, res) => {
  
    const errors = validationResult(req); //check input validation
  
    const {oldpassword, password ,confirmPassword} = req.body; // assing data in request into variabls
    
    const user = await pharmaciesModel.find({_id:req.params.id}); //search for the pharmacy by id in url
 
if(user){ // user is exist 
   
    const match = await bcrypt.compare(oldpassword , user[0].password); //check input validation
    
        if (match) { //old pass is match
          if (errors.isEmpty()) { //no validaion error
            
           try{
      
            const hashPassword = bcrypt.hashSync(password, 8); //make password hashed 
            await pharmaciesModel.findOneAndUpdate({_id:req.params.id},{password:hashPassword}); //save new password
            res.json({ message: "password edited successfully"}); 
        }

           catch (e) {// print error if it exist
                res.json(e)
              }

         }
         else { //there is validaion error
            res.json({ message: errors.array()});
          }
  
        }else //old password is not match
        {  
              res.json({ message: "old password is not match"});
        }
    }else //pharmcay_id is not found
     {
        res.json({ message: "Id is not exist"});
     }
  
  
  
    };

module.exports.edit_customer_password = async (req, res) => {
  
        const errors = validationResult(req); //check input validation
      
        const {oldpassword, password ,confirmPassword} = req.body; // assing data in request into variabls
        
        const user = await customersModel.find({_id:req.params.id}); //search for the pharmacy by id in url
     
    if(user){ // user is exist 
       
        const match = await bcrypt.compare(oldpassword , user[0].password); //check input validation
        
            if (match) { //old pass is match
              if (errors.isEmpty()) { //no validaion error
                
               try{
          
                const hashPassword = bcrypt.hashSync(password, 8); //make password hashed 
                await customersModel.findOneAndUpdate({_id:req.params.id},{password:hashPassword}); //save new password
                res.json({ message: "password edited successfully"}); 
            }
    
               catch (e) {// print error if it exist
                    res.json(e)
                  }
    
             }
             else { //there is validaion error
                res.json({ message: errors.array()});
              }
      
            }else //old password is not match
            {  
                  res.json({ message: "old password is not match"});
            }
        }else //pharmcay_id is not found
         {
            res.json({ message: "Id is not exist"});
         }
      
      
      
    };    