const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:mongoose.Types.ObjectId},
    isVegan:{type:Boolean,default:false},
    isGlutenFree:{type:Boolean,default:false},
    position:{type:Number},
    cloudinary_id:{type:String}
},{timestamps:true});


const Product = mongoose.model('Product',productSchema);

module.exports = Product;