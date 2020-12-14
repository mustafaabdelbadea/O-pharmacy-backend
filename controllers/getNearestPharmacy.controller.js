const customersModel = require("../models/customer.model");
const pharmaciesModel = require("../models/pharmacies.model");
const Geo = require('geo-nearby');

module.exports.nearestPharmacy=async(req,res)=>{

    let pharmacies=await pharmaciesModel.find({}).select("_id locationAsCoordinates.coordinates ");
    // console.log(pharmacies[0].locationAsCoordinates.coordinates)
    let data;
    for(pharmacy=0;pharmacy<pharmacies.length-1;pharmacy++){
        data=[pharmacies[pharmacy]]
    }
    console.log(data)
    res.json(pharmacies);


// const data = [
//   { lat: -35.30278, lon: 149.14167, name: '45151' },
//   { lat: -33.86944, lon: 151.20833, name: 'Sydney' },
//   { lat: -37.82056, lon: 144.96139, name: 'Melbourne' },
//   { lat: -34.93333, lon: 138.58333, name: 'Adelaide' },
//   { lat: 29.9912363, lon: 31.133079799999997, name: '528145' },
//   { lat: 29.9912363, lon: 31.133079799999999, name: '5155474' }
// ];
 
// const geo = new Geo(data, { setOptions: { id: 'name', lat: 'lat', lon: 'lon' } });
 
// //geo.nearBy(-33.87, 151.2, 5000);
// console.log(geo.nearBy(29.9912363, 31.133079799999998, 2000))

}