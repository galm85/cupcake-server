const Category = require('../models/category.model');
const Product = require('../models/product.model');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const router = require('express').Router();
var ObjectId = require('mongoose').Types.ObjectId; 


// get all products
router.get('/',async(req,res)=>{

    const categoryId = (req.query.categoryId);
    const page = Number(req.query.page);
    const itemsPerPage = Number(req.query.itemsPerPage);
    let total = 0;
    let products = [];
    
    if(categoryId == 'all'){
        
       total = await Product.count();
       products = await Product.aggregate([
            {
                $lookup:{
                    from:'categories',
                    localField:'category',
                    foreignField:'_id',
                    as:'category_title'
                }
            }
            ]).sort({'position':1}).skip(page*itemsPerPage - itemsPerPage).limit(itemsPerPage);
    
    }else{
        
        total = await Product.count({category:categoryId});
        products = await Product.aggregate([
            {
                $match:{category:new ObjectId(categoryId)}
            },
            {
                $lookup:{
                    from:'categories',
                    localField:'category',
                    foreignField:'_id',
                    as:'category_title'
                }
            }
            ]).sort({'position':1}).skip(page*itemsPerPage - itemsPerPage).limit(itemsPerPage);
    }
    
    
    
    
    return res.status(200).json({products,total});
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
            product.image = 'https://res.cloudinary.com/gal-web-dev/image/upload/v1653297131/cupcake_factory/noImage_nlh0jm.png';

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
        const product = await Product.findByIdAndRemove(req.params.id);
        if(product.cloudinary_id){
            await cloudinary.v2.uploader.destroy(product.cloudinary_id);
        }
        return res.status(200).json({message:`${product.title} has been deleted`});
    } catch (error) {
        res.status(400).json({message:'SOmthing went wrong. The product did not delete'});
    }
})



//get products by categoty id
router.get('/get-products-by-category/:categoryId',async (req,res)=>{
    try {
            // const products = await Product.find({category:req.params.categoryId});
            const products = await Product.aggregate([
                {
                    $match:{category:new ObjectId(req.params.categoryId)}
                },
                {
                    $lookup:{
                        from:'categories',
                        localField:'category',
                        foreignField:'_id',
                        as:'category_title'
                    }
                }
            ])
            return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({message:"Something went wrong, please try again"});
    }
})


// edit Product
router.patch('/edit-product/:productId',upload.single('image'),async(req,res)=>{

    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        let body = (req.body);
        
        

        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{upload_preset: "cupcake_factory"});
            body.image = result.secure_url;
            body.cloudinary_id = result.public_id;
            await cloudinary.v2.uploader.destroy(product.cloudinary_id);
            await Product.findByIdAndUpdate(productId,body);
            return res.json({message:'Product Updated with new image'});

        }else{
            await Product.findByIdAndUpdate(productId,body);
            return res.json({message:'Product Updated with old image'});

        }
    } catch (error) {
        return res.status(400).json({message:'Somthing went wrong',error});
    }
})




// get cupcakes
router.get('/get-products/get-cupcakes',async(req,res)=>{
    
    try {
        const cupcakes = await Product.find({category:'628b48fbd6648be276e7ce8d'});
        return res.status(200).json(cupcakes);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'something went wrong'})
    }
})



//search product
router.get('/search/:value',async(req,res)=>{
    try {
        const value = req.params.value.toLowerCase();
        // const products = await Product.find(
        //         {title:{$regex:value,$options:"i"}} ,
        //     );

        const products = await Product.aggregate([
            {
                $match:{title:{$regex:value,$options:"i"}}
            },
            {
                $lookup:{
                    from:'categories',
                    localField:'category',
                    foreignField:'_id',
                    as:'category_title'
                }
            }
        ])
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})


// auto complete products
router.get('/auto-complete/:value',async(req,res)=>{

    try {
        const value = req.params.value.toLowerCase();
        // const products = await Product.find({title:{$regex:value,$options:"i"}}).select('title');
        const products = await Product.aggregate([
            {
                $match:{title:{$regex:value,$options:"i"}}
            },
            {
                $lookup:{
                    from:'categories',
                    localField:'category',
                    foreignField:'_id',
                    as:'category_title'
                }
            }
        ])

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})








module.exports = router;