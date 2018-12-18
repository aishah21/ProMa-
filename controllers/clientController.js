var express = require('express');
var router = express.Router();

var client = require('../models/clients');
var user = require('../models/users');

router.get('/new', user.getAll, renderNew);
router.get('/:id/edit', client.find, renderEdit);
router.get('/:id', client.find, renderShow);
router.get('/', client.getAll, renderIndex);

router.post('/', client.create, redirectShow);
router.put('/:id', client.update, redirectShow);
router.delete('/:id', client.delete, redirectIndex);

function renderIndex(req, res){
  var mustacheVariables = {
    clients: res.locals.clients
  }
  res.render('./client/index', mustacheVariables);
}

function renderShow(req, res) {
  var mustacheVariables = {
    client: res.locals.client
  }
  res.render('./client/show', mustacheVariables);
}

function renderNew(req, res) {
  var mustacheVariables = {
    user: res.locals.users
  }
  res.render('./client/new', mustacheVariables);
}

function renderEdit(req, res) {
  var mustacheVariables = {
    client: res.locals.client,
    user: res.locals.users
  }
  res.render('./client/edit', mustacheVariables);
}

function redirectIndex(req,res){
  res.redirect('/client');
}

function redirectShow(req, res) {
  res.redirect(`/client/${res.locals.clientId}`);
}

module.exports = router;