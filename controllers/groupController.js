var express = require('express');
var router = express.Router();

var group = require('../models/group');
var member = require('../models/members');


router.get('/new', group.getAll, renderNew);
router.get('/:id/edit', group.find, member.getAll, renderEdit);
router.get('/:id', group.find,member.findByGroup, renderShow);
router.get('/', group.getAll, renderIndex);

router.post('/', group.create, redirectShow);
router.put('/:id', group.update, redirectShow);
router.delete('/:id', group.delete, redirectIndex);

function renderIndex(req, res){
  var mustacheVariables = {
    groups: res.locals.groups
  }
  res.render('./group/index', mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = {
    group: res.locals.group,
    members: res.locals.members  
  }
  res.render('./group/show', mustacheVariables);
}
function renderNew(req, res) {
    var mustacheVariables = {
      group: res.locals.group
    }
    res.render('./group/new', mustacheVariables);
  }
  
  function renderEdit(req, res) {
    var mustacheVariables = {
      group: res.locals.group,
     members: res.locals.members  
    }
    res.render('./group/edit', mustacheVariables);
  }
  
  function redirectIndex(req,res){
    res.redirect('/group');
  }
  
  function redirectShow(req, res) {
    res.redirect(`/group/${res.locals.group_id}`);
  }
  

module.exports = router;