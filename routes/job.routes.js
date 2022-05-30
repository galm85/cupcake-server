const Job = require('../models/job.model');

const router = require('express').Router();


// get all Jobs
router.get('/',async(req,res)=>{
    
    const jobs = await Job.find({});
    return res.status(200).json(jobs);
})








// post new Job
router.post('/',async(req,res)=>{
    try {
        let job = new Job(req.body);
        await job.save();
        return res.status(200).json({message:'New Job Added'});
    } catch (error) {
        return res.status(400).json({message:'Somthing went wrong',error});
    }
})


// edit Product
router.patch('/edit-job/:jobId',async(req,res)=>{
    try {
        await Job.findByIdAndUpdate(req.params.jobId,req.body);
        return res.status(200).json({message:'Job Updated'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Something Went wrong'})
        
    }
})

// edit Product
router.delete('/delete-job/:jobId',async(req,res)=>{
    try {
        await Job.findByIdAndDelete(req.params.jobId);
        return res.status(200).json({message:'Job Deleted'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Something Went wrong'})
        
    }
})






module.exports = router;