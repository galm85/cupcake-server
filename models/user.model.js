const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String},
    isAdmin:{type:Boolean,default:false},
},{timestamps:true});


userSchema.methods.renderToken = function(){
    const token = jwt.sign({_id:this._id,email:this._email,isAdmin:this.isAdmin},process.env.JWT_KEY);
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = User;