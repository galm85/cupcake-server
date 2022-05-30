const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId},
    items:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    status:{type:String,default:'in progress'},
    totalAmount:{type:Number},
    contactPerson:String,
    address:String,
    city:String,
    phone:String,
    paymentMethod:String,
    creditCard:String,
    
},{timestamps:true});


const Order = mongoose.model('Order',orderSchema);

module.exports = Order;