const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema({
    
    firstName:String,
    lastName:String,
    gender:String,
    phone:String,
    email:String,
    cv:String,
    jobId:mongoose.Types.ObjectId,
    cloudinary_id:String,
},{timestamps:true});


const Application = mongoose.model('Application',applicationSchema);

module.exports = Application;