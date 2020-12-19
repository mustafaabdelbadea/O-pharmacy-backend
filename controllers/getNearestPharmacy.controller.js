const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");
const ordersModel = require("../models/orders.model");
const jwt = require('jsonwebtoken');

const Geo = require('geo-nearby');

module.exports.nearestPharmacy = async (req, res) => {
    //get all pharmacies and ignore password
    const token = req.header('token');

    try {
        let { orderByTexting, orderByPhoto } = req.body;
        //check if customer entered order or not
        if (orderByPhoto || orderByTexting) {
            let pharmacies = await pharmaciesModel.find({}).select("-password")
            console.log(orderByPhoto, orderByTexting)
            //res.json(pharmacies[0].locationAsCoordinates.coordinates.lon);
            /*
            add id and coordinates into format 
             data=[
                { lat:'5252',lon:"665851",name:"_id"} ,
                { lat:'5252',lon:"665851",name:"_id"} 
         
            ]
            */

            const data = [];
            for (pharmacy = 0; pharmacy < pharmacies.length; pharmacy++) {
                data.push({
                    lat: pharmacies[pharmacy].locationAsCoordinates.coordinates.lat,
                    lon: pharmacies[pharmacy].locationAsCoordinates.coordinates.lon,
                    name: pharmacies[pharmacy]._id
                })
            }
            console.log(data)
            //format of data 
            const geo = new Geo(data, { setOptions: { id: 'name', lat: 'lat', lon: 'lon' } });
            //get customer by id 
        //get id from header
        jwt.verify(token, 'pharmjwt', async(err, decoded) => {
            if (err) {
                res.json({message : 'error in token' ,errors: err });
            }
            else {
               const _id=decoded._id;
            
               let customer = await customersModel.findOne({ _id });
               //get lat and lon of customer and address
   
               const customerLat = customer.locationAsCoordinates.coordinates.lat;
               const customerLon = customer.locationAsCoordinates.coordinates.lon;
               const cutsomerAddres = customer.locationAsAddress;
               //check if cutomer has enered coordinates or not
               if (customerLat && customerLat != undefined && customerLat != null && customerLon && customerLon != undefined && customerLon != null) {
                   console.log(cutsomerAddres)
                   console.log(geo.nearBy(customerLat, customerLon, 2000))
                   
                   nearPharmacies=geo.nearBy(customerLat, customerLon, 2000); //near Pharmacies id
                   
                   pharmaciesIdStatus=[]//array of object for near Pharmacy id and order status for it
                   for( pharmacy=0; pharmacy<nearPharmacies; pharmacy++)
                   {
                    pharmaciesIdStatus.push({
                        id: nearPharmacies[pharmacy],
                        status:"active"
                    })
                   }
                   
                   let order;

                  if(orderByTexting&&orderByPhoto){
                    order= new ordersModel({
                    date : Date(),
                    orderByTexting,
                    orderByPhoto,
                    customerID:_id,
                    pharmaciesID:pharmaciesIdStatus
                    }) //take order
                }
                  else if(orderByTexting){
                    order = new ordersModel({
                        date : Date(),
                        orderByTexting,
                        customerID:_id,
                        pharmaciesID:pharmaciesIdStatus
                        }) //take order
                   }
                   else if(orderByPhoto){ordersModel({
                    date : Date(),
                    orderByPhoto,
                    customerID:_id,
                    pharmaciesID:pharmaciesIdStatus
                    }) //take order
                }
                    

                    try {
                        await order.save(); //save order in database
                    } catch (error) {
                        res.json(error) //send error if it occur during saving in database
                    }

                   
   
               }
               else {
                   res.json({ msg: "enter your location on map" });
               }
        }
             
            })
          
            //get all pharmacies in 2 kilos

        }
        else {
            res.json({ msg: "no order found" });
        }
    } catch (error) {
        res.json(error);
    }

}