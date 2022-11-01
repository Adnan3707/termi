const express = require('express');
const route = express.Router()
const controller = require('../database/connection')
const axios = require('axios')
var bodyParser = require('body-parser').json()
route.get('/',async (req,res)=> {
   try {
     const clmn =  await axios.get('http://localhost:3000/api/users/clmn')
     const response = await axios.get("http://localhost:3000/api/users");
        const data = {
          colmn: clmn.data.data,
          users: response.data.rows,
        };
        // console.log(test.data.data)
        // res.render("Login")
        // res.render("Signup")
        res.render("index", { users: data });
   } catch (err) {
     console.error(err);
   }

//   await axios
//     .get("http://localhost:3000/api/users")
//     .then((response) => {
//       // console.log(response.data.rows)
//       res.render(
//         "index",
//         { users: response.data.rows }
//         //   { col: clmn.data.data }
//       );
//     })
//     .catch((err) => {
//       res.send(err);
//     });
}
)
route.get('/add-column',async (req,res)=> {
  const details = await axios.get('http://localhost:3000/api/users/alldata')
  const detailscol = await axios.get('http://localhost:3000/api/users/alldatadrp')
  console.log(detailscol.data.data1)
   res.render('inputrow',{ cdata: details.data.data ,ddata:detailscol.data.data1 });
}
)
route.get('/add-user',async (req,res)=> {
//   try{
//   const details = await axios.get('http://localhost:3000/api/users/alldata')
//    res.render('add_user',{ cdata: details.data.data });
//    try{
//     const drpd = await axios.get('http://localhost:3000/api/extra/dropdownretv')
//    }catch(err){
//     console.log(err)
//    }
// }catch(err){
//   console.log(err)
// }
//   try{
//   const drpd = await axios.get('http://localhost:3000/api/extra/dropdownretv')
// }catch(err){
//   console.log(err)
// }
// await axios.get('http://localhost:3000/api/extra/dropdownretv').then(async (drpdn)=> await axios.get('http://localhost:3000/api/users/alldata').then((data)=>res.render('add_user',{ cdata: data.data.data ,drp:drpdn})))
// await axios.get('http://localhost:3000/api/users/alldata').then(async (data)=> await axios.get('http://localhost:3000/api/extra/dropdownretv').then((drpdn)=>res.render('add_user',{ cdata: data.data.data ,drp:drpdn})))
// await axios.get('http://localhost:3000/api/extra/dropdownretv').catch(err=>console.log(err)).finally(  await axios.get('http://localhost:3000/api/users/alldata').then((data)=>res.render('add_user',{ cdata: data.data.data })).catch(err=>console.log(err)).finally(console.log('done data')))
// const details = await axios.get('http://localhost:3000/api/users/alldata')
  // console.log(details.data.data)

  //  res.render('add_user',{ cdata: details.data.data });
  try {
    const details =  await axios.get('http://localhost:3000/api/users/alldata')
    console.log('1')
    const drpd = await axios.get('http://localhost:3000/api/extra/dropdownretv')
    console.log(drpd.data.drpd)
    res.render('add_user', { cdata: details.data.data,drpd: drpd})
  } catch (err) {
    console.error(err);
  }
}
)
route.get('/update-user',(req,res)=> {
      axios.get('http://localhost:3000/api/users',{ params : { id:req.query.id }}).then((userdata)=>{
         console.log(req.query.id)
      res.render('update_user',{user: userdata.data.rows});
   }).catch(err=>{
      res.send(err)
   })
   //  res.render('update_user');
})


route.get("/Search", (req, res) => {
  axios
    .get("http://localhost:3000/api/users/search", {
      params: { first: req.query.first },
    })
    .then((response) => {
      console.log(response.data.data);
      // console.log(response.data.data);
      res.render("search", { users: response.data.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

route.post('/api/users',bodyParser, controller.create);
route.get('/api/users', controller.find);
route.get("/api/users/name", controller.findName);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
route.get('/api/users/search/', controller.Search);
route.get("/api/users/search/new", controller.Searchnew);
route.get("/api/users/search/id",controller.Byid);
route.get("/api/users/search/sta",controller.ByStatus);
route.get("/api/users/clmn", controller.Test);
route.get("/api/users/addclm",controller.Addclm)
route.get("/api/users/samename",controller.Getname)
route.get('/api/users/alldata',controller.detailsAll)
route.get('/api/users/alldatadrp',controller.detailsAll1)
route.get('/api/users/insert',controller.insert)
route.get('/api/extra/dropdown',controller.add)
route.get('/api/extra/delcol',controller.delcol)
route.get('/api/extra/dropdowncol',controller.addcol)
route.get('/api/extra/dropdownretv',controller.retv)
module.exports = route