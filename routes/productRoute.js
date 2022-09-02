const express = require("express");
//const multer = require('multer');

const {
  addRow,
  updaterow,
  deleteCustomer,
  getAllCustomer,
  getCustomerColoums,
  joinTables,
  saveData,
  highestMarksCheck
} = require("../controller/userController");
  
  const{csvFile}=require("../controller/csvController")
const router = express.Router();


//! Use of Multer
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/')    
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
 
// var upload = multer({
//     storage: storage
// });



router.route("/insert").post(addRow);

router.route("/updatecustomer/:id").put(updaterow);

router.route("/deletecustomer/:id").delete(deleteCustomer);

router.route("/getAllCustomer").get(getAllCustomer);

router.route("/getCustomerColoums").get(getCustomerColoums);

router.route("/jointables").get(joinTables);

router.route("/savedata").post(saveData);

router.route("/highestMarksCheck").get(highestMarksCheck);

//router.route("/savedata").post(csvFile);
router.route("/csv-file").post(csvFile);



module.exports = router;
