const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
    city:String,
    image:String,
    address:String,
    phone:String,
    events:Boolean,
    weekdayOpen:String,
    weekdayClose:String,
    friOpen:String,
    friClose:String,
    satOpen:String,
    satClose:String,
    cloudinary_id:String,    
},{timestamps:true});


const Restaurant = mongoose.model('Restaurant',restaurantSchema);

module.exports = Restaurant;