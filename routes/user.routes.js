const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// get all users
router.get('/',async(req,res)=>{
    const users = await User.find({});
    return res.status(200).json(users);
})


// get user by id
router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(500).json({message:'no user found. wrong ID'})
        }
    } catch (error) {
        res.status(400).json({message:'error '+error});
    }
})


// Register new User
router.post('/register',async(req,res)=>{
    try {
        let user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        return res.status(200).json({message:'User register successfully'});
    } catch (error) {
        return res.status(400).json({message:'Something went wrong',error});
    }
})



// signin user
router.post('/sign-in',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(403).json({message:'Wrong Email'});

        const compare = await bcrypt.compare(req.body.password,user.password);
        if(!compare) return res.status(403).json({message:'Wrong Password'});

        return res.status(200).json({token:user.renderToken()});
        
    } catch (error) {
        return res.status(400).json({message:'Something went wrong',error});
    }
})



// delete User
router.delete('/:id',async(req,res)=>{
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        return res.status(200).json({message:`${user.fisrtName} has been deleted`});
    } catch (error) {
        res.status(400).json({message:'Something went wrong. The Category did not delete'});
    }
})




module.exports = router;