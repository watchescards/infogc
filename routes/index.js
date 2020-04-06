var express = require('express');
var router = express.Router();
const middleware = require("../middleware");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/popular-gift-cards', function(req, res, next) {
  res.render('popular', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});
router.get('/dashboard/messages', function(req, res, next) {
  res.render('contact_messages', { title: 'Express' });
});

router.get('/cards/walmart', function(req, res, next) {
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

module.exports = router;
