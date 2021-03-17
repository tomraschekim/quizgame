
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/vocabescape", {useNewUrlParser: true},{userUnifiedTopology: true});
mongoose.set("useCreateIndex",true);

const userSchema = new mongoose.Schema ({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  if(req.isAuthenticated){
    res.render("home");
  } else{
    res.redirect("login");
  }

})

app.get("/english_dasshutsu_game", function(req,res){
  res.render("quiz");
})

app.get("/finish", function(req,res){
  res.render("finish");
})

app.get("/logout", function(req,res){
  req.logOut();
  res.redirect("/");
})

// post
app.post("/signup", function(req,res){
  User.register({username: req.body.username},req.body.password, function (err, userregistered){
    if(err){
      console.log(err);
      res.redirect("/signup");
    }else{
      passport.authenticate("local")(req,res, function(){
        res.redirect("/home");
      } )
    }
  })
})

  app.post("/login", function(req,res){
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function(err){
      if(err){
        console.log(err);
      }else{
        passport.authenticate("local")(req,res, function(){
          res.redirect("/home")});
      }
    })
  })





// listen
app.listen(3000, () => {
  console.log("The server has started on port 3000");
})

