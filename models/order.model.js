const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId},
    order:{type:String,required:true},
    status:{type:String},
    totalAmount:{type:Number},
},{timestamps:true});


const User = mongoose.model('User',userSchema);

module.exports = User;