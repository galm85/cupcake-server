const Category = require('../models/category.model');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const router = require('express').Router();


// get all categories
router.get('/',async(req,res)=>{
    const categories = await Category.find({});
    return res.status(200).json(categories);
})


// get category by id
router.get('/:id',async(req,res)=>{
    try {
        const category = await Category.findById(req.params.id);
        if(category){
            res.status(200).json(category);
        }else{
            res.status(500).json({message:'no Category found'})
        }
    } catch (error) {
        res.status(400).json({message:'error '+error});
    }
})


// post new category
router.post('/',upload.single('image'),async(req,res)=>{
    try {
        let category = new Category(req.body);
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{upload_preset: "cupcake_factory"});
            category.image = result.secure_url;
            category.cloudinary_id = result.public_id;
        }else{
            category.image = 'noImage.png';
        }
        await category.save();
        return res.status(200).json({message:'New Category added'});
    } catch (error) {
        return res.status(400).json({message:'Somthing went wrong',error});
    }
})

// delete category
router.delete('/:id',async(req,res)=>{
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        return res.status(200).json({message:`${category.title} has been deleted`});
    } catch (error) {
        res.status(400).json({message:'SOmthing went wrong. The Category did not delete'});
    }
})




module.exports = router;