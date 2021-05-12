const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");

module.exports.edit_Pharmacy_name = async (req, res) => {
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async(err, decoded) => {
        if (err) {
            res.json({message : 'error in token' ,errors: err });
        }
        else {
           const id=decoded._id
           
   const errors = validationResult(req); //check input validation
  
    const { name} = req.body; // assing data in request into variabls
 
    const user = await pharmaciesModel.find({_id:id}); //search for the pharmacy by id in token
 
        if(user){ // user is exist 
       
            if (errors.isEmpty()) { //no validaion error
                
            try{
        
            await pharmaciesModel.findOneAndUpdate({_id:id},{name:name}); //save new name
                res.json({ message: "name edited successfully"}); 
            }

            catch (e) {// print error if it exist
                    res.json(e)
                }

            }
            else { //there is validaion error
                res.json({ message: errors.array()});
            }
  
        }else //id is not found
        {  
              res.json({ message: "Id is not exist"});
        }
    
        }
    })
  
  
  
  
    };

module.exports.edit_customer_name = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json('error in token');
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const { name} = req.body; // assing data in request into variabls
        
        const user = await customersModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await customersModel.findOneAndUpdate({_id:id},{name:name}); //save new name
                    res.json({ message: "name edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };

module.exports.edit_Pharmacy_password = async (req, res) => {
    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt', async(err, decoded) => {
        if (err) {
            res.json('error in token');
        }
        else {
           const id=decoded._id
           
    const errors = validationResult(req); //check input validation
  
    const {oldpassword, password ,confirmPassword} = req.body; // assing data in request into variabls
    
    const user = await pharmaciesModel.find({_id:id}); //search for the pharmacy by id in token
 
    if(user){ // user is exist 
    
        const match = await bcrypt.compare(oldpassword , user[0].password); //check input validation
        
            if (match) { //old pass is match
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                    const hashPassword = bcrypt.hashSync(password, 8); //make password hashed 
                    await pharmaciesModel.findOneAndUpdate({_id:id},{password:hashPassword}); //save new password
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
        }else //Id is not exist
        {
            res.json({ message: "Id is not exist"});
        }
            }
        })
    
    
    
    
        };

module.exports.edit_customer_password = async (req, res) => {

    let token = req.header('token');
    token =token.substring(6);

    jwt.verify(token, 'pharmjwt',async(err, decoded) => {
        if (err) {
            res.json({massage : "error in token"});
        }
        else {
            const id =decoded._id
            const errors = validationResult(req); //check input validation
      
            const {oldpassword, password ,confirmPassword} = req.body; // assing data in request into variabls

            const user = await customersModel.find({_id:id}); //search for the pharmacy by id in token
         
        if(user){ // user is exist 
           
            const match = await bcrypt.compare(oldpassword , user[0].password); //check input validation
            
                if (match) { //old pass is match
                    if (errors.isEmpty()) { //no validaion error
                        
                    try{
                
                        const hashPassword = bcrypt.hashSync(password, 8); //make password hashed 
                        await customersModel.findOneAndUpdate({_id:id},{password:hashPassword}); //save new password
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
            }else //id is not found
             {
                res.json({ message: "Id is not exist"});
             }
        }
    })
  

      
      
      
    };

module.exports.edit_Pharmacy_phones = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);


        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json({message : 'error in token' ,errors: err });
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const { phones} = req.body; // assing data in request into variabls
        
        const user = await pharmaciesModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await pharmaciesModel.findOneAndUpdate({_id:id},{phones:phones}); //save new phones
                    res.json({ message: "phones edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };

module.exports.add_Pharmacy_phones = async (req, res) => {
            let token = req.header('token');
            token =token.substring(6);

            jwt.verify(token, 'pharmjwt', async(err, decoded) => {
                if (err) {
                    res.json({message : 'error in token' ,errors: err });
                }
                else {
                   const id=decoded._id
                   
            const errors = validationResult(req); //check input validation
            const newPhones = req.body.phones;// assing data in request into variabls
            
            const user = await pharmaciesModel.find({_id:id}); //search for the pharmacy by id in token
         
                if(user){ // user is exist 

                  let phones = await pharmaciesModel.find({_id:id}).select("phones");
                   phones=phones[0].phones.concat(newPhones);
                    if (errors.isEmpty()) { //no validaion error
                        
                    try{
                
                    await pharmaciesModel.findOneAndUpdate({_id:id},{phones:phones}); //save new phones
                        res.json({ message: "phones added successfully"}); 
                    }
        
                    catch (e) {// print error if it exist
                            res.json(e)
                        }
        
                    }
                    else { //there is validaion error
                        res.json({ message: errors.array()});
                    }
          
                }else //id is not found
                {  
                      res.json({ message: "Id is not exist"});
                }
            
                }
            })
          
          
          
          
    };

module.exports.edit_customer_phone = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json('error in token');
            }
            else {
               const id=decoded._id
               
       // const errors = validationResult(req); //check input validation
      
        const { phone} = req.body; // assing data in request into variabls
        
        const user = await customersModel.find({_id:id}); //search for the pharmacy by id in token
            if(user){ // user is exist 
           
               // if (errors.isEmpty()) { //no validaion error
                try{
            
                await customersModel.findOneAndUpdate({_id:id},{phone:req.body.phones[0]}); //save new phone
                    res.json({ message: "phone edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array(),test:'45'});
                }
      
            // }else //id is not found
            // {  
            //       res.json({ message: "Id is not exist"});
            // }
        
            }
        })
      
      
      
      
    };

module.exports.edit_Pharmacy_address = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json({message : 'error in token' ,errors: err });
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const { address} = req.body; // assing data in request into variabls
        
        const user = await pharmaciesModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await pharmaciesModel.findOneAndUpdate({_id:id},{locationAsAddress:address}); //save new address
                    res.json({ message: "address edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };

module.exports.edit_customer_address = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json('error in token');
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const { address} = req.body; // assing data in request into variabls
        
        const user = await customersModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await customersModel.findOneAndUpdate({_id:id},{locationAsAddress:address}); //save new address
                    res.json({ message: "address edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };

module.exports.edit_Pharmacy_logo = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json({message : 'error in token' ,errors: err });
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const  logo = req.body.photo; // assing data in request into variabls
        const user = await pharmaciesModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await pharmaciesModel.findOneAndUpdate({_id:id},{logo:logo}); //save new logo
                    res.json({ message: "logo edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };

module.exports.edit_customer_photo = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json('error in token');
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const { photo} = req.body; // assing data in request into variabls
        
        const user = await customersModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await customersModel.findOneAndUpdate({_id:id},{photo:photo}); //save new photo
                    res.json({ message: "photo edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };

module.exports.edit_Pharmacy_coordinates = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json({message : 'error in token' ,errors: err });
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const { lat , lon} = req.body; // assing data in request into variabls
        let coordinates = { lat, lon}
        let locationAsCoordinates= {coordinates}

        const user = await pharmaciesModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await pharmaciesModel.findOneAndUpdate({_id:id},{locationAsCoordinates:locationAsCoordinates}); //save new Coordinates
                    res.json({ message: "Coordinates edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };

module.exports.edit_customer_coordinates = async (req, res) => {
        let token = req.header('token');
        token =token.substring(6);

        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json('error in token');
            }
            else {
               const id=decoded._id
               
        const errors = validationResult(req); //check input validation
      
        const { lat , lon} = req.body; // assing data in request into variabls
        let coordinates = { lat, lon}
        let locationAsCoordinates= {coordinates}
        
        const user = await customersModel.find({_id:id}); //search for the pharmacy by id in token
     
            if(user){ // user is exist 
           
                if (errors.isEmpty()) { //no validaion error
                    
                try{
            
                await customersModel.findOneAndUpdate({_id:id},{locationAsCoordinates:locationAsCoordinates}); //save new Coordinates
                    res.json({ message: "Coordinates edited successfully"}); 
                }
    
                catch (e) {// print error if it exist
                        res.json(e)
                    }
    
                }
                else { //there is validaion error
                    res.json({ message: errors.array()});
                }
      
            }else //id is not found
            {  
                  res.json({ message: "Id is not exist"});
            }
        
            }
        })
      
      
      
      
    };    