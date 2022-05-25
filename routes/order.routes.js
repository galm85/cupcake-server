const router = require('express').Router();
const { findById } = require('../models/order.model');
const Order = require('../models/order.model');
const { getTotalPrice } = require('../utils/functions');

//get all orders order by status;
router.get('/',async(req,res)=>{
    const orders = await Order.find({}).sort({'isActive':1});
    return res.status(200).json(orders);
})


//get current order by user ID
router.get('/current-order/:userId',async(req,res)=>{
    try {
        const order = await Order.findOne({userId:req.params.userId,isActive:true})
        if(order){
            let items = JSON.parse(order.items);
            let total = getTotalPrice(items);
            res.status(200).json({items,total});
        }else{
            res.status(500).json({items:[],total:0});
        }
    } catch (error) {
        res.status(400).json({message:'error '+error});
    }
})


// create New order
router.patch('/current-order/:userId',async(req,res)=>{
  
    try {
      
        let order = await Order.findOne({userId:req.params.userId,isActive:true});
        if(order){
            let items = JSON.parse(order.items);
            items.push(req.body);
            let total = getTotalPrice(items);
            items = JSON.stringify(items);

            await Order.findByIdAndUpdate(order._id,{$set:{items:items}});
            return res.json({message:'order updated',items,total});
        }else{            
            let items = [];
            items.push(req.body);
            let total = getTotalPrice(items);
            items = JSON.stringify(items);
            order = new Order({
                userId:req.params.userId,
                items:items,
            })
            await order.save();
            return res.json({message:'first item added',items,total});
        }
      
    } catch (error) {
         return res.status(400).json({message:'Something went wrong',error});
       
    }
})





module.exports = router;