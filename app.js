const express =require('express');
const bodyparser = require('body-parser');
const csv = require('fast-csv');
//const multer = require('multer');
//const path = require('path')

const app = express();
const { db } = require("./config/database");



//use express static folder
app.use(express.static("./public"))

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true}))


//importing routes
const product = require('./routes/productRoute')

//using middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//routes use
app.use("/api/v1",product)

module.exports = app