const db = require("../config/database");

exports.addRow = async (req, res) => {
  let post = { name: "Smith", city: "jaipur", country: "india" };

  let sql = "INSERT INTO customers SET ?";

  let query = db.query(sql, post, function (err) {
    if (err) {
      throw err;
    }

    res.send("Employee 1 added");
  });
};

//db.query("select * from customers",function( result, error ){
//console.log(result,"hello")
//})

exports.updaterow = async (req, res) => {
  let newName = "test";
  let newCity = "jaipur";
  let newCountry = "india";

  let sql = `UPDATE customers SET name = '${newName}',city='${newCity}', country = '${newCountry}'WHERE id = ${req.params.id}`;

  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("Post updated...");
  });
};

exports.deleteCustomer = async (req, res) => {
  let sql = `DELETE FROM customers WHERE id = ${req.params.id}`;

  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("customer deleted");
  });
};

exports.getAllCustomer = async (req, res) => {
  let sql = `SELECT * FROM customers `;

  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
    //console.log(" Get All customers")
  });
};

exports.getCustomerColoums = async (req, res) => {
  let sql = `SELECT name,city FROM customers  `;

  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
    //console.log(" Get customers name and city")
  });
};

exports.joinTables = async (req, res) => {
  let sql = `SELECT products.id AS ID, products.user_id AS user_id, customers.name AS name, products.product_name AS product
  FROM products
 JOIN customers ON customers.id=products.user_id`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
    console.log("tables join");
  });
};

exports.saveData = async (req, res) => {
  let userId = req.body.user_id;
  let subjectId = req.body.subject_id;
  let productId = req.body.product_id;
  let mark = req.body.marks;
  if (!userId) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  if (!subjectId) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide subject_id" });
  }

  if (!productId) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide product_id" });
  }
db.query(
    "SELECT * From tests Where user_id='"+userId+"' AND subject_id='"+subjectId+"' AND product_id='"+productId+"'",[],
    function (error, results, fields) {
        if (error) throw error;
        if( results.length > 0 ) {

            return res.send({
            error: true,
            data: results,
            message: "already user exists",
            });

        } else {
            db.query(
                "INSERT INTO tests SET ? ",
                { user_id: userId,subject_id: subjectId, product_id: productId,marks: mark},
                function (error, results, fields) {
                  if (error) throw error;
                  return res.send({
                    error: false,
                    data: results,
                    message: "New user has been created successfully.",
                  });
                }
              );
        }
      }
)
};


exports.highestMarksCheck = async(req,res) => {
//highest marks query
  //  let sql = `SELECT SUM(marks) AS Marks FROM tests group by user_id`;

  //total marks query
 // let sql=`SELECT SUM(marks) AS marks from tests`;



 //joins 2 tables error problem
 //let sql=`SELECT tests.user_id AS userId,tests.marks AS marks,customers.name AS name,FROM tests CROSS JOIN customers WHERE customers.id=tests.user_id`;
 let sql = `SELECT tests.user_id AS user_id, customers.name AS name
  FROM tests
 JOIN customers ON customers.id=tests.user_id`;

  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
    console.log("tables join");
  });
}


