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


router.patch('/edit-job/:jobId',async(req,res)=>{
    console.log('edit');
    try {
        await Job.findByIdAndUpdate(req.params.jobId,req.body);
        return res.status(200).json({message:'Job Updated'});
    } catch (error) {
        return res.status(400).json({message:"somethin went wrong" , error});
    }
})



//get job by id
router.get('/job-by-id/:id',async(req,res)=>{
    
    try {
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(400).json({message:'The job is not abvilable anymore'});
        }
        return res.status(200).json(job);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Something went wrong'});
    }
})


router.delete('/delete-job/:jobId',async(req,res)=>{
    try {
        await Job.findByIdAndDelete(req.params.jobId);
        return res.status(200).json({message:'Job removed'});
    } catch (error) {
        return res.status(400).json({message:'Something went wrong',error});
        
    }
})






module.exports = router;