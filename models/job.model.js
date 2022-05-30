const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    positionTitle:String,
    location:String,
    description:String,
    requirement:String,
    
    
    
},{timestamps:true});


const Job = mongoose.model('Job',jobSchema);

module.exports = Job;