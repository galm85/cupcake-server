const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId},
    items:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    totalAmount:{type:Number},
},{timestamps:true});


const Order = mongoose.model('Order',orderSchema);

module.exports = Order;