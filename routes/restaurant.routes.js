const Restaurant = require('../models/restaurant.model');

const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const router = require('express').Router();


// get all Restaurants
router.get('/',async(req,res)=>{

 
    
    const restaurants = await Restaurant.find({});
    return res.status(200).json(restaurants);
})








// post new restaurant
router.post('/',upload.single('image'),async(req,res)=>{
    try {
        let restaurant = new Restaurant(req.body);
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{upload_preset: "cupcake_factory"});
            restaurant.image = result.secure_url;
            restaurant.cloudinary_id = result.public_id;
        }else{
            restaurant.image = 'https://res.cloudinary.com/gal-web-dev/image/upload/v1653297131/cupcake_factory/noImage_nlh0jm.png';

        }
        await restaurant.save();
        return res.status(200).json({message:'New restaurant added'});
    } catch (error) {
        return res.status(400).json({message:'Somthing went wrong',error});
    }
})


// edit Product
router.patch('/edit-restaurant/:restaurantId',upload.single('image'),async(req,res)=>{

    try {
        const restaurantId = req.params.restaurantId;
        const restaurant = await Restaurant.findById(restaurantId);
        let body = (req.body);
        
        

        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{upload_preset: "cupcake_factory"});
            body.image = result.secure_url;
            body.cloudinary_id = result.public_id;
            await cloudinary.v2.uploader.destroy(restaurant.cloudinary_id);
            await Restaurant.findByIdAndUpdate(restaurantId,body);
            return res.json({message:'Restaurant Updated with new image'});

        }else{
            await Restaurant.findByIdAndUpdate(restaurantId,body);
            return res.json({message:'Restaurant Updated with old image'});

        }
    } catch (error) {
        return res.status(400).json({message:'Something went wrong',error});
    }
})


// delete restaurant
router.delete('/:id',async(req,res)=>{
 
    try {
        const restaurant = await Restaurant.findByIdAndRemove(req.params.id);
        if(restaurant.cloudinary_id){
            await cloudinary.v2.uploader.destroy(restaurant.cloudinary_id);
        }
        return res.status(200).json({message:`restaurant has been deleted`});
    } catch (error) {
        res.status(400).json({message:'Somthing went wrong. The restaurant did not delete'});
    }
})





// edit Product
// router.patch('/edit-product/:productId',upload.single('image'),async(req,res)=>{

//     try {
//         const productId = req.params.productId;
//         const product = await Product.findById(productId);
//         let body = (req.body);
        
        

//         if(req.file){
//             const result = await cloudinary.v2.uploader.upload(req.file.path,{upload_preset: "cupcake_factory"});
//             body.image = result.secure_url;
//             body.cloudinary_id = result.public_id;
//             await cloudinary.v2.uploader.destroy(product.cloudinary_id);
//             await Product.findByIdAndUpdate(productId,body);
//             return res.json({message:'Product Updated with new image'});

//         }else{
//             await Product.findByIdAndUpdate(productId,body);
//             return res.json({message:'Product Updated with old image'});

//         }
//     } catch (error) {
//         return res.status(400).json({message:'Somthing went wrong',error});
//     }
// })









module.exports = router;