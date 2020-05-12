//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyPaser = require("body-parser")

const app = express();
app.use(bodyPaser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/secretDB",{useNewUrlParser:true,useUnifiedTopology: true});

const encrypt = require('mongoose-encryption');


const peopleSchema = new mongoose.Schema ({
  email:String,
  password:String,
});


peopleSchema.plugin(encrypt,{secret: process.env.SECRET,encryptedFields:['password']});

const PeopleModel = mongoose.model("People",peopleSchema);

const people = new PeopleModel({
  email : "miao jun",
  password : "123456",
});

people.save();

app.get("/",function(req,res){
  res.render("home")
})

app.get("/login",function(req,res){
res.render("login")
})

app.get("/register",function(req,res){
res.render("register")
})


















app.listen(3000, function(){
  console.log("Server is running on port 3000")
});
