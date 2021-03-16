
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/vocabescape", {useNewUrlParser: true},{userUnifiedTopology: true});

const userSchema = ({
  username: String,
  password: String
});

const User = new mongoose.model("User", userSchema)
app.set('view engine', 'ejs');

app.use(express.static('public'))



// get
app.get('/', function(req, res){
    res.render("login");
})
app.get("/signup", function(req,res){
  res.render("signup");
})
app.get("/home", function(req,res){
  res.render("home");

})

app.get("/english_dasshutsu_game", function(req,res){
  res.render("quiz");
})

app.get("/finish", function(req,res){
  res.render("finish");
})
// post
app.post("/signup", function(req,res){
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    // password2: req.body.confirm_password
  })
  
    newUser.save(function(err){
      if(err){
        console.log(err);
      } else{
        res.render("home");
  
      }
  })}
  
 

  );





// listen
app.listen(3000, () => {
  console.log("The server has started on port 3000");
})

