const Category = require('../models/category.model');
const Product = require('../models/product.model');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const router = require('express').Router();


// get all products
router.get('/',async(req,res)=>{
    const products = await Product.find({});
    return res.status(200).json(products);
})


// get product by id
router.get('/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.status(200).json(product);
        }else{
            res.status(500).json({message:'no product found'})
        }
    } catch (error) {
        res.status(400).json({message:'error '+error});
    }
})


// post new Product
router.post('/',upload.single('image'),async(req,res)=>{
    try {
        let product = new Product(req.body);
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{upload_preset: "cupcake_factory"});
            product.image = result.secure_url;
            product.cloudinary_id = result.public_id;
        }else{
            product.image = 'noImage.png';
        }
        await product.save();
        return res.status(200).json({message:'New product added'});
    } catch (error) {
        return res.status(400).json({message:'Somthing went wrong',error});
    }
})

// delete product
router.delete('/:id',async(req,res)=>{
    try {
        const product = await Category.findByIdAndRemove(req.params.id);
        return res.status(200).json({message:`${product.title} has been deleted`});
    } catch (error) {
        res.status(400).json({message:'SOmthing went wrong. The product did not delete'});
    }
})




module.exports = router;