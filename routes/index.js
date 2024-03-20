var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const upload = require("./multer")
passport.use(new LocalStrategy(userModel.authenticate()));
/* GET home page. */


// mongoose.connect("mongodb+srv://manishlawhale345:pinterestclone@cluster0.st0wccv.mongodb.net/?retryWrites=true&w=majority")

router.post("/upload",isLoggedIn,upload.single("file"),async(req,res)=>{
  if(!req.file){
    return res.status(400).send("No files were uploaded") 
  }
  const user = await userModel.findOne({username:req.session.passport.user});
  const post = await postModel.create({
    image:req.file.filename,
    postText:req.body.postText,
    user:user._id
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile")
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'LogOut',error:req.flash("error") });
});

router.get("/logout",(req,res)=>{
  res.render("login",{ title: 'Login',error:req.flash("error") })
})

router.get('/feed',isLoggedIn, function(req, res, next) {
  res.render('feed');
});

router.get("/profile",isLoggedIn,async function(req,res,next){
  const user = await userModel.findOne({username:req.session.passport.user}).populate("posts");
  // console.log(user);
  res.render("profile",{user})
})

router.post("/register",async(req,res)=>{
  const {username,email,fullName,password}=req.body;
  const userData = new userModel({username,email,fullName});

  userModel.register(userData,password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true
}),function(req,res){
});

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated())return next();
  res.redirect("/login")
}


module.exports = router;
