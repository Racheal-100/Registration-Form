var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/Registration');

 var db=mongoose.connection;
 db.on('error', ()=> console.log("Error in connecting to database"));
 db.once('open', ()=>
   console.log("connection succeeded")
 )

var app=express()

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('REG_FDR'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post("/register", (req,res)=>{
   var fname = req.body.fname;
   var lname =req.body.lname;
   var  email= req.body.email;
   var dob =req.body.dob;

   var data = {
      "first name": fname,
      "last name":lname,
      "emails":email,
      "date of birth":dob

   }

db.collection("Users").insertOne(data, (err,colleection)=>{
   if(err){
      throw err;
   }

   console.log("Record inserted successfully");
});

 return res.redirect("RegisterSuccess.html");
})

app.get("/", (req,res)=>{
   res.set({
      "Allow-access-Allow-Origin": '*'
   })
    
   return res.redirect("Reg.html");
 })



app.listen(3000, ()=>{
   console.log("server listening at port 3000");
});

