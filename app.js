const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
  const Admin = require('./models/admin');
  const Card = require('./models/cards');
const User = require('./models/user');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');


const axios = require('axios');

const fs = require('fs');
const { db } = require('./models/admin');

mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://watches:reset123@cluster0.nj0ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    keepAlive: true,
    useNewUrlParser: true,
     useUnifiedTopology: true
}).then(()=>{
  console.log('Connected')
});


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/add_card',async function(req,res){
  res.render('add_card');
})

app.post('/add_card_post',async function(req,res){
await Card.create(req.body)
  res.redirect('/add_card')
})

// passport.use('admin',new LocalStrategy(db.Admin.authenticate()));


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false}
}));

//please follow this order

app.use(passport.initialize());
app.use(passport.session());

passport.use('admin',new LocalStrategy(Admin.authenticate()));
passport.use('user',new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if(user!=null)
    done(null,user);
});



app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');

  next();
});


app.get('/getname/:lat/:lon',async function(req,res){    

axios.get(`https://www.zomato.com/webroutes/location/get?lat=${req.params.lat}&lon=${req.params.lon}`)
  .then((response) => {
    return res.status(200).json({message:response.data.locationDetails.placeName});
  });
});

app.use('/', indexRouter);

app.use('/user', userRouter);

var port = process.env.PORT || 3000;
app.listen(port,function () {
  console.log("The Server Has Started!");
});

module.exports = app;
