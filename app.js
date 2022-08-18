const express =require('express')

const app = express();

//importing routes
const product = require('./routes/productRoute')

//using middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//routes use
app.use("/api/v1",product)

module.exports = app