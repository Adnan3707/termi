const mysql = require('mysql');

var table = 'Testing'
var table1 = 'extra'

const con = mysql.createConnection({
  host: "database-do-user-10312936-0.b.db.ondigitalocean.com",
  port: 25060,
  user: "doadmin",
  password: "AVNS_BvBYzrF4U6SJbmP",
  database: "dummy",
  // port: '/var/run/mysqld/mysqld.sock'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// for(i=0;i<data.length;i++){
//   con.query(
//     // `INSERT INTO Testing (name, email, gender, status) VALUES (${req.body.name},${req.body.email},${req.body.gender},${req.body.status})`
//     "INSERT INTO Testing SET name = ?, email = ?, gender = ?, status = ?",
//     [data[i].Name, data[i].Email, data[i].Gender, data[i].Status],
//     function (err, result) {
//       console.log("updated")
//     }
//   );
// }

// create and save new user
exports.create = (req,res)=>{
  console.log("entered create")
  // console.log(req)
  console.log(req.body)
    // validate request
    if(!req.body){
      console.log('Emp')
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    console.log(req.body.Name)
      con.query(
        // `INSERT INTO Testing (name, email, gender, status) VALUES (${req.body.name},${req.body.email},${req.body.gender},${req.body.status})`
'INSERT INTO Testing SET Name = ?, Email = ?, Gender = ?, Status = ?', [req.body.Name, req.body.Email, req.body.Gender,req.body.Status]
, function (err, result) {
    if (err) throw err;
    console.log(result)
    res.status(200).send(
      {
      message:'Inserted',
      data: result
    })
    //  res.status(200).redirect('/add-user')
    // console.log("Result: " + result);
  });
    //     });

}


// // retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
      console.log(req.query.id)
        const id = req.query.id;
              con.query(`SELECT * FROM ${table} WHERE id = ?`,[id], (err, rows) => {
    // When done with the connection, release it
    // console.log('The data from user table: \n', rows);

    // console.log(rows)
    
    res.send({
      rows:rows
    })
  })
            }
   else{
              con.query(`SELECT * FROM ${table} `, (err, rows) => {
    // When done with the connection, release it
    // console.log('The data from user table: \n', rows);
    res.send({
      rows:rows
    })
      })
    }
}

// // Update a new idetified user by user id

exports.update = (req, res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    console.log(req.body)
    con.query(
'UPDATE Testing SET Name = ?, Email = ?, Gender = ?, Status = ? WHERE id = ?', [req.body.Name, req.body.Email, req.body.Gender,req.body.Status ,req.body.id]
, function (err, result) {
    if (err) throw err;
    res.status(200).send({
      message:'Updated',
      data: result
    })
  });

}
exports.Search =(req,res)=>{
  // console.log(req.query.first);
  // console.log(req.body.first);
con.query(
  // 'SELECT * FROM Testing WHERE name LIKE ?' , [req.query.first], function (err, result) {
  "SELECT * FROM Testing WHERE name LIKE ?",
  [req.query.first],
  function (err, result) {
    if (err) throw err;
    res.status(200).send({
      message: "Searched",
      data: result,
    });
    // console.log("Result: " + result);
  }
);
}

// New Search
exports.Searchnew = (req, res) => {
  // console.log(req);
  con.query(
    // 'SELECT * FROM Testing WHERE name LIKE ?' , [req.query.first], function (err, result) {
    "SELECT * FROM Testing WHERE name LIKE ?",
    [req.query.first],
    function (err, result) {
      if (err) throw err;
      res.status(200).send({
        message: "Searched",
        data: result,
      });
      // console.log("Result: " + result);
    }
  );
};
// // Delete a user with specified user id in the request
exports.delete = (req, res)=>{
  // console.log('Entered Delete')
  con.query('DELETE FROM Testing WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.status(200).send({message:'User Status succcessly set Deleted'})
    } else {
      console.log(err);
    }  
  });

}

exports.Byid = (req,res)=>{
  con.query(
    "SELECT * FROM Testing WHERE id >= ? AND id <= ?",
    [req.query.value1 , req.query.value2],
      function (err, result) {
        if (err) throw err;
        res.status(200).send({
          message: "Searched",
          data: result,
        });
        // console.log("Result: " + result);
      }
  );
}
exports.ByStatus=(req,res)=>{
  console.log(req.query.first)
  req.query.first != "Select" ?
          con.query(
            "SELECT * FROM Testing WHERE Status = ?",
            [req.query.first],
            function (err, result) {
              if (err) throw err;
              // result.pipe(res)
              res.status(200).send({
                message: "Searched",
                data: result,
              });
              // console.log("Result: " + result);
            }
          )
      :
          con.query(
            "SELECT * FROM Testing ",
            function (err, result) {
              if (err) throw err;
              res.status(200).send({
                message: "Searched",
                data: result,
              });
              // console.log("Result: " + result);
            }
          )
}
exports.Test = (req, res) => {
  con.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${table}'`,
    function (err, result) {
      if (err) throw err;
      res.status(200).send({
        message: "Searched",
        data: result,
      });
      // console.log("Result: " + result);
    }
  );
};
exports.Addclm = (req,res)=>{
  console.log(req.query.first)
      con.query("ALTER TABLE Testing ADD "+ req.query.first + " varchar(255)", function (err, result) {
        if (err) throw err;
        res.status(200).send({
          message: "Searched",
          data: result,
        });
        console.log("Result: " + result);
      });
}
exports.Getname = (req,res)=>{
  con.query("SELECT Name, count(*) AS c FROM Testing GROUP BY Name HAVING c > 1 ORDER BY c DESC", function (err, result) {
        if (err) throw err;
        res.status(200).send({
          message: "Same Name",
          data: result,
        });
})
}
exports.findName = (req, res)=>{
    console.log(req.query.Name)
    if(req.query.Name){
      console.log(req.query.Name)
        const name = req.query.Name;
              con.query(`SELECT * FROM ${table} WHERE Name = ?`,[name], (err, rows) => {
    // When done with the connection, release it
    // console.log('The data from user table: \n', rows);

    // console.log(rows)
    
    res.send({
      rows:rows
    })
  })
}
}
exports.detailsAll=(req,res)=>{
  console.log('Entered Details')
con.query(`SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE  FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${table}'
`,function(err,result){
  if (err) throw err;
  // console.log(result)
  // return result;
  res.send({
   data:result
  })
})

}
exports.detailsAll1=(req,res)=>{

console.log('*****************  Table 2 **********************')
// con.query(`SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE  FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${table1}'
// `,function(err,result1){
//   if (err) throw err;
//   res.send({
//     data1:result1
//    })
// })
con.query(`SELECT * from ${table1}`,function(err,result1){
  if (err) throw err;
  res.send({
    data1:result1
   })
})
// con.query(`DELETE FROM ${table1} WHERE drpname='testdrop'`,function(err,result1){
//   if (err) throw err;
// })
// con.query(`DELETE FROM ${table1} WHERE drpname='testdrp'`,function(err,result1){
//   if (err) throw err;
// })
// con.query(`DELETE FROM ${table1} WHERE drpname='test'`,function(err,result1){
//   if (err) throw err;
// })
// con.query(`DELETE FROM ${table1} WHERE drpname='hello'`,function(err,result1){
//   if (err) throw err;
// })
// con.query(`DELETE FROM ${table1} WHERE drpname='testdrop'`,function(err,result1){
//   if (err) throw err;
// })
// console.log(data);
// console.log(data1)
}
// --------------- Input Coumn
exports.insert=(req,res)=>{
  console.log('Entered Details')
  
con.query(`SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE  FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${table}'
`,function(err,result){
  if (err) throw err;
  res.send({
   data:result
  })
})

}
exports.add=(req,res)=>{
  console.log(req.query)
  con.query(`INSERT INTO ${table1} SET drpname = ?, drpvalue = ?`, [req.query.drpname, req.query.drpvalue],
  function(err,result){
  if (err) throw err;
  console.log("Data Sent Sucessfully",result)
})
}
exports.delcol=(req,res)=>{
  console.log(req.query)
  console.log(Object.keys(req.query)[0])
  if(Object.keys(req.query)[0].includes(',')){
    console.log(Object.keys(req.query)[0].split(',')[1])
      con.query(`DELETE FROM ${table1} WHERE drpname = '${Object.keys(req.query)[0].split(',')[1]}'`,function(err,result){
  if (err) throw err;
  console.log('row deleted sucessufully from extrs table')
})
  }
  else{
  con.query(`ALTER TABLE ${table} DROP ${Object.keys(req.query)[0]}`,function(err,result){
  if (err) throw err;
  console.log('Coloum deleted sucessufully')
})
  }
}
exports.addcol=(req,res)=>{
  console.log(req.query)
  con.query(`ALTER TABLE ${table} ADD ${req.query.column_name} ${req.query.datatype}`,function(err,result){
    if (err) throw err;
    console.log('Coloum Added Sucessufully')
  })
}
exports.retv=(req,res)=>{
  con.query(`SELECT * FROM ${table1}`,function(err,result){
    if (err) throw err;
    res.send({
      drpd:result
    })
    // console.log('dropdown data got Sucessufully')
    // console.log(result)
  })
}
exports.sqlcon= con