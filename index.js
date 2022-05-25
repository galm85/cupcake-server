const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4001;

// routes
const categoriesRoutes = require('./routes/category.routes');
const usersRoutes = require('./routes/user.routes');
const productsRoutes = require('./routes/product.routes');
const ordersRoutes = require('./routes/order.routes');

mongoose.connect(process.env.MONGO_URI)
    .then(console.log('Connect to mongoose'))
    .then(()=>app.listen(PORT,()=>console.log(`Server is running on: http://localhost:${PORT}`)))
    .catch(err=>console.log(err));


app.use(express.json());
app.use(cors());


app.use('/categories',categoriesRoutes);
app.use('/users',usersRoutes);
app.use('/products',productsRoutes);
app.use('/orders',ordersRoutes);


app.get('/',(req,res)=>{
    res.send('CupCake factory');
})





