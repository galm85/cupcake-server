const Application = require('../models/application.model');
const path = require('path');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const {cvFile} = require('../utils/multer');
const router = require('express').Router();


// get all applications
router.get('/',async(req,res)=>{
    const applications = await Application.find({});
    return res.status(200).json(applications);
})








// post new restaurant
router.post('/',cvFile.single('cv'),async(req,res)=>{
    let ext = path.extname(req.file.originalname); 
    const format = ext.substring(1);
    
   
    try {
        let application = new Application(req.body);
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{folder:'cupcake_factory/applications',resource_type:'auto',format:format});
            application.cv = result.secure_url;
            application.cloudinary_id = result.public_id;
        }else{
           return res.status(400).json({message:'CV file is requierd'});
        }
        await application.save();
        return res.status(200).json({message:'application saved'});
    } catch (error) {
        return res.status(400).json({message:'Somthing went wrong',error});
    }
})


// get applications by job id
router.get('/applications-by-job/:jobId',async(req,res)=>{
    try{
        const applications = await Application.find({jobId:req.params.jobId});
        return res.status(200).json(applications); 
    }catch(error){
        console.log(error);
        return res.stats(400).json({message:'Something went wrong'});
    }
})











module.exports = router;