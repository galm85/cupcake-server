const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    position:{type:Number},
},{timestamps:true});


const Category = mongoose.model('Categorie',categorySchema);

module.exports = Category;