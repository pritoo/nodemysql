const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "",

  database: "test",
});
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MySql Connected");
  }
});

module.exports = db;
