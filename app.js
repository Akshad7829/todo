//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var favicon = require('serve-favicon');
var path = require('path');
// const date = require(__dirname + "/date.js");

const app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const dbURI="mongodb+srv://db:asn7829@cluster0.9sld41u.mongodb.net/?retryWrites=true&w=majority";
// const dbURI="mongodb+srv://<user>:yash123456@@cluster0.hnaib.mongodb.net/myFirstDatabase?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true";
mongoose.connect(dbURI,{ useNewUrlParser:true , useUnifiedTopology:true})
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      dbURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

const itemSchema = {
  name : String,
}

const Item = mongoose.model("item", itemSchema);
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
const item1 = new Item({
  name : "welcome"
});
const item2 = new Item({
  name : "added"
});

const item3 = new Item({
  name : "goodbye"
});

const defaultItem = [item1 , item2 , item3];



app.get("/", function(req, res) {
  Item.find({} , function(err , found){
    // if(found.length == 0){
    //   Item.insertMany(defaultItem , function(err){
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log("added");
    //     }
    //   });
    //   res.redirect('/');
    // }
    // else{
      res.render("list", {listTitle: "today", newListItems: found});
    // }
  })

  // 

});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const item = new Item({
      name : itemName,
  })
  item.save();
  res.redirect("/")
});

app.post("/delete" , function(req , res){
  const checkItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkItemId,function(err){
    if(!err){
        console.log("deleted");
        res.redirect("/")
    }
  })
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
