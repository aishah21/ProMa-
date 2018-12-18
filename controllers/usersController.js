var express = require('express');
var router = express.Router();

var user = require('../models/users');
// var auth = require('../middleware/auth');

router.get('/new', renderNew);
// router.get('/:id', auth.onlyUsers, user.find, renderShow);

router.post('/', user.create, redirectShow);

function renderNew(req, res){
  res.render('./users/new');
}
function renderShow(req, res) {
  console.log(req.session.user)
  var mustacheVariables = {
    user: res.locals.user
  }
  res.render('./users/show', mustacheVariables)
}

function redirectShow(req, res) {
  res.redirect(`/users/${res.locals.userId}`);
}

module.exports = router;