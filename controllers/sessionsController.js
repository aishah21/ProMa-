var express = require('express');
var router = express.Router();
var session = require('../models/session');

router.get('/', renderNew);
router.post('/', session.create, redirectShow);
router.delete('/', session.delete, redirectLogin);

function renderNew(req, res){
  console.log(req.session.user)
  res.render('./login');
}

function redirectShow(req, res){
  if(req.session.user){
    res.redirect(`/users/${req.session.user.id}`)
  }else{
    res.redirect('/login');
  }
}

function redirectLogin(req, res){
  res.redirect('/login');
}

module.exports = router;