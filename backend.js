

const express = require('express');
const app = express();

app.use(express.static('public'))



app.get('/', (req, res) => {
    res.sendFile(__dirname+("/view/home.html"))
})

app.get("/english_dasshutsu_game", function(req,res){
  res.sendFile(__dirname+"/view/quiz.html");
})

app.get("/finish", function(req,res){
  res.sendFile(__dirname+"/view/finish.html");
})

app.listen(3000, () => {
  console.log("The server has started on port 3000");
})

