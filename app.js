
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))




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

app.listen(3000, () => {
  console.log("The server has started on port 3000");
})

