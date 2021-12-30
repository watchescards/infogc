var express = require('express');
var router = express.Router();
const middleware = require("../middleware");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport'),
  LocalStrategy = require("passport-local");
const fs = require('fs'),
cloudinary = require('cloudinary'),
multipart = require('connect-multiparty');

multipartMiddleware = multipart();
const nodemailer = require('nodemailer');
cloudinary.config({
    cloud_name: 'saikiran2211',
    api_key: '325518163817134',
    api_secret: 'EUrowRf2-p9cmCy4UMGb3NHhPPU'
});

  const Admin = require('../models/admin');
    const Card = require('../models/cards');
const User = require('../models/user');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const cards = await  Card.find({});
  var c = cards;
  var pop = c.splice(0,3);
  const cardss = await  Card.find({});
  res.render('index', { cards: cardss,pop:pop });
});


router.get('/setnow',async function(req,res){
  const cards = await  Card.find({});
  return res.render('changeStatus',{cards:cards});
})

router.get('/update/:id',async function(req,res){
  const cards = await  Card.findOne({_id:req.params.id});
  if(cards.canFake ){
    cards.canFake =false;
  }else{
    cards.canFake =true;
  }
  cards.save()
  res.redirect('/setnow')
  // return res.render('changeStatus',{cards:cards});
})


router.get('/popular-gift-cards',async function(req, res, next) {
  const cards = await  Card.find({});
  res.render('popular', { cards: cards });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.post('/update_card/:id',async function(req, res, next) {
console.log(req.body)
  const cards = await  Card.findOne({_id:req.params.id});
    cards.card_description = req.body.card_description;
    cards.customer_care = req.body.customer_care;
    cards.card_image = req.body.card_image;
    cards.hq = req.body.hq;
    cards.save()
    res.redirect('/')
});
router.post('/search-sell',async function(req, res, next) {

  if(req.body.search){
    res.redirect(`/sell-gift-card/${req.body.search}`)

  }else{
    res.redirect(`/sell-gift-card/all`)

  }
  // const cards = await  Card.find({card_name:req.body.search});
  // res.render('popular', { cards: cards });
});

router.post('/search-cb',async function(req, res, next) {

  if(req.body.search){
    res.redirect(`/check-balance/${req.body.search}`)

  }else{
    res.redirect(`/check-balance/all`)

  }
  // const cards = await  Card.find({card_name:req.body.search});
  // res.render('popular', { cards: cards });
});


router.get('/check-balance/:search',async function(req, res, next) {
  const regex = new RegExp(escapeRegex(req.params.search), 'gi');
  console.log(req.params)
  if(req.params.search == "all"){
    const cards = await  Card.find({});
  res.render('cb', { cards: cards,search:'all' });
  }else{
    // const cards = await  Card.find({card_name:req.params.search});
    const cards = await  Card.find({card_name:regex});
    console.log(cards)
  res.render('cb', { cards: cards,search:req.params.search });
  }
  
});
router.get('/sell-gift-card/:search',async function(req, res, next) {
  const regex = new RegExp(escapeRegex(req.params.search), 'gi');
  console.log(req.params)
  if(req.params.search == "all"){
    const cards = await  Card.find({});
  res.render('sell', { cards: cards,search:'all' });
  }else{
    // const cards = await  Card.find({card_name:req.params.search});
    const cards = await  Card.find({card_name:regex});
    console.log(cards)
  res.render('sell', { cards: cards,search:req.params.search });
  }
  
});


router.get('/cards/:id',async function(req, res, next) {
  const card = await  Card.findOne({_id:req.params.id});
  res.render('card_specific', { card: card });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/dashboard',middleware.isLoggedIn, function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});
router.get('/dashboard/messages', function(req, res, next) {
  res.render('contact_messages', { title: 'Express' });
});

router.get('/cards/Walmart', function(req, res, next) {
  res.render('walmart', { title: 'Express' });
});
router.get('/cards/home-depot', function(req, res, next) {
  res.render('homedepot', { title: 'Express' });
});

router.get('/cards/target', function(req, res, next) {
  res.render('target', { title: 'Express' });
});
router.get('/cards/bestbuy', function(req, res, next) {
  res.render('bestbuy', { title: 'Express' });
});

router.get('/cards/starbucks', function(req, res, next) {
  res.render('starbucks', { title: 'Express' });
});

router.get('/cards/itunes', function(req, res, next) {
  res.render('itunes', { title: 'Express' });
});
router.get('/cards/amazon', function(req, res, next) {
  res.render('amazon', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/connect-with-market', function(req, res, next) {
  res.render('connect', { title: 'Express' });
});

router.get('/cards/aberchrobie-and-fitch', function(req, res, next) {
  res.render('aberchrobie-and-fitch', { title: 'Express' });
});

router.get('/cards/aeropostale', function(req, res, next) {
  res.render('aeropostale', { title: 'Express' });
});


router.get('/cards/bigbazar', function(req, res, next) {
  res.render('bigbazar', { title: 'Express' });
});
router.get('/cards/calvin-klin', function(req, res, next) {
  res.render('calvin-klin', { title: 'Express' });
});

router.get('/cards/ebay', function(req, res, next) {
  res.render('ebay', { title: 'Express' });
});

router.get('/cards/fossil', function(req, res, next) {
  res.render('fossil', { title: 'Express' });
});
router.get('/cards/fandango', function(req, res, next) {
  res.render('fandango', { title: 'Express' });
});

router.get('/cards/yankee-candle', function(req, res, next) {
  res.render('yankee');
});

router.get('/cards/ralph-laurel', function(req, res, next) {
  res.render('ralph');
});
router.get('/cards/ralph-laurel', function(req, res, next) {
  res.render('ralph');
});
router.get('/cards/mc-donalds', function(req, res, next) {
  res.render('mcd');
});
router.get('/cards/nordstrom', function(req, res, next) {
  res.render('nordstrom');
});
router.get('/cards/quiznos', function(req, res, next) {
  res.render('quiznos');
});
router.get('/cards/sephora', function(req, res, next) {
  res.render('sephora');
});

router.get('/cards/netflix', function(req, res, next) {
  res.render('netflix');
});

router.get('/cards/dunkin-donuts', function(req, res, next) {
  res.render('ddonuts');
});
router.get('/cards/tgif', function(req, res, next) {
  res.render('tgif');
});
router.get('/cards/lego', function(req, res, next) {
  res.render('lego');
});


router.get('/cards/oakley', function(req, res, next) {
  res.render('oakley');
});
router.get('/cards/kfc', function(req, res, next) {
  res.render('kfc');
});
router.get('/cards/zappos', function(req, res, next) {
  res.render('zappos');
});
router.get('/cards/pizza-hut', function(req, res, next) {
  res.render('pizzahut');
});

router.get('/cards/sam-club', function(req, res, next) {
  res.render('sclub');
});
router.get('/cards/jcpenney', function(req, res, next) {
  res.render('jcpenny');
});
router.get('/cards/under-armour', function(req, res, next) {
  res.render('uarmour');
});
router.get('/cards/gucci', function(req, res, next) {
  res.render('gucci');
});


router.get('/cards/game-stop', function(req, res, next) {
  res.render('gamestop');
});


router.get('/cards/cvs-pharma', function(req, res, next) {
  res.render('cvspharma');
});

router.get('/cards/foot-locker', function(req, res, next) {
  res.render('footlocker');
});

router.get('/cards/kohls', function(req, res, next) {
  res.render('kohls');
});









router.post("/user_login", (req, res, next) => {
  passport.authenticate("admin", (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      
      return res.redirect('/login');
    }

      req.logIn(user, err => {
        if (err) { return next(err); }

        let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/dashboard';
        delete req.session.redirectTo;
        res.redirect(redirectTo);


      });

 })(req, res, next);
});


router.post("/signup", function (req, res, next) {
const newUser = {
    username:req.body.username,
    email:req.body.email
};
  Admin.register(newUser, req.body.password, function(err, user){
    if(err){
        console.log(err);
        return res.redirect("/signup"); 
    }
    res.redirect("/login"); 
  });

});

router.get('/dashboard/add', function(req,res){
  return res.render('admin_add');
})

router.post('/add',multipartMiddleware, function(req,res){
   cloudinary.v2.uploader.upload(req.files.card_image.path,function (err, result) {
    req.body.card_image = result.url;
  Card.create(req.body);
  return res.redirect('/dashboard/add');
});
});

module.exports = router;
