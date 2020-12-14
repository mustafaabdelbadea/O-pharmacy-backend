const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");
const Geo = require('geo-nearby');

module.exports.nearestPharmacy = async (req, res) => {
//get all pharmacies and ignore password
    let pharmacies = await pharmaciesModel.find({}).select("-password")

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
    const _id = req.body._id ;
    let customer=await customersModel.findOne({_id});
    //get lat and lon of customer 
     const customerLat=customer.locationAsCoordinates.coordinates.lat;
     const customerLon=customer.locationAsCoordinates.coordinates.lon;
//get all pharmacies in 2 kilos
     console.log(geo.nearBy(customerLat, 31.133079799999998, 2000))
}