const db = require("../config/database");
const fs = require('fs');
const fastcsv = require("fast-csv");
const path = require('path')

exports.csvFile= async (req, res) => {
    // UploadCsvDataToMySQL(__dirname + '/upload/' + req.file.filename);
    // res.json({
    //             'msg': 'File uploaded/import successfully!', 'file': req.file
    //  });

    //function UploadCsvDataToMySQL(student.csv){
        const directoryPath = path.join(__dirname, '../uploads/student.csv');
        console.log(directoryPath); 
        let stream = fs.createReadStream(directoryPath);
        // stream.on('open', function () {
        //     stream.pipe(res);
        //   });
       // console.log(stream)
        let csvData = [];
        let csvStream = fastcsv
       
    .parse()
        .on("data", function(data) {
          csvData.push(data);
        })
        .on("end", function() {
          // remove the first line: header
          csvData.shift();
      
                // Open the MySQL connection
                 db.connect((error) => {
                     if (error) {
                        console.error(error);
                    } else {
                        let query = 'INSERT INTO student (stdID,stdName,marks) VALUES ?';
                        console.log(query)
                        db.query(query, [csvData], (error, response) => {
                            console.log(error || response);
                            
                        });
                    }
                });
                 
                // delete file after saving to MySQL database
                // -> you can comment the statement to see the uploaded CSV file.
                fs.unlinkSync(filePath)
            });
      
        stream.pipe(csvStream);

        res.json({
                'msg': 'File uploaded/import successfully!', 'file': req.file
     });
       
}
//}
