const express = require('express');
const mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const fs = require('fs')
const csv = require('fast-csv')
const db = require('/home/adnan/CRUD/assets/server/database/connection.js')
const multer  = require('multer')
const { EOL } = require('os');

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null,'/home/adnan/CRUD/assets/upload')
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname),
      )
    },
    // filename: (req, file, cb) => {
    //     const name = file.originalname.split('').join(__);
    //     const extension = MIME_TYPES[file.mimetype];
    //     cb(null, name + Date.now() + '.' + extension);
    //     // cb()
    // }
  })
  const upload = multer({    storage: storage})


// , dest: '/home/adnan/CRUD/assets/upload' 

  app.post('/api/uploadcsv',  (req, res,next) => {
    upload.single('uploadcsv')(req, res, function (error) {
        // console.log(req.file)
        if (error) {
          console.log(`upload.single error: ${error}`);
          return res.sendStatus(500);
        }
    csvToDb('/home/adnan/CRUD/assets/upload/' + req.file.filename,2)
        // res.json({
        //     msg: 'File successfully inserted!',
        //     file: req.file,
        //   })
        res.redirect('/add-column');
      })
    //   console.log(req.filename)


  })
  // const db = mysql.createConnection({
  //   host: "database-do-user-10312936-0.b.db.ondigitalocean.com",
  //   user: "doadmin",
  //   password: "AVNS_BvBYzrF4U6SJbmP",
  //   database: "dummy",
  //   port: "25060",
  // });
  const CSV_STRING = [
    'a,b',
    'a1,b1',
    'a2,b2'
].join(EOL);

  function csvToDb(csvUrl,n) {
    let stream = fs.createReadStream(csvUrl)
    let collectionCsv = []
    let csvFileStream = csv
      .parse()
      .on('data', function (data) {
        // console.log('************',n)
        // let count = 0 ;
        // if(count == n) {
        //   console.log('Row Number is ',n)
        //   console.log(data)
        // }
        // console.log('************',count)
        // count=count + 1
        // console.log(data)
        collectionCsv.push(data)
      })
      .on('end', function (rowCount) {
        console.log(`Parsed ${rowCount} rows`)
        // collectionCsv.shift()
        console.log(collectionCsv[n])
        let upload = collectionCsv[n]
        // db.connect((error) => {
        //   if (error) {
        //     console.error(error.code)
        //   } else {
        //     for(let i = 0 ; i<collectionCsv.length-1;i++){
        //     let query = 'INSERT INTO extra SET drpname = ?, drpvalue = ?'
        //     db.query(query, [collectionCsv[i][0].split(';').shift(),collectionCsv[i][0].split(';').slice(1).join(',')], (error, res) => {
        //       console.log(error || res)
        //     })
        // }
        for(let i = 0 ; i<collectionCsv.length;i++){
          let query = 'INSERT INTO extra SET drpname = ?, drpvalue = ?'
          db.sqlcon.query(query, [collectionCsv[i][0],collectionCsv[i].slice(1).join(',')], (error, res) => {
            if (error) throw err;
            console.log("Data Sent Sucessfully",res)
          })
      }
        //   }
        // })
        console.log(upload[0])
        console.log(upload.slice(1).join(','))
        fs.unlinkSync(csvUrl)
      })
    stream.pipe(csvFileStream)
    // csvFileStream.write(CSV_STRING);
    // stream.end();
  }


// app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve('/home/adnan/CRUD/assets/views'))
app.use(bodyparser.urlencoded({ extended : true}))
// app.use(express.static(path.join(`/home/adnan/CRUD/node_modules/FancyForm-master`)));
// load assets
// app.use('/css', express.static(path.resolve('/home/adnan/CRUD/assets/css')))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
// app.use("/node_modules", express.static(path.resolve(`/home/adnan/CRUD/node_modules/FancyForm-master`)));
app.use(express.static('/home/adnan/CRUD/node_modules'));

//Load router
app.use('/',require('./assets/server/routes/router'))

app.listen(3000,()=>{
    console.log('Server is running')
})
