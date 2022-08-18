const mysql = require('mysql');
const app =require("./app");
const { db } = require("./config/database");

const port = 4001

app.listen(port);