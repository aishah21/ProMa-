var express = require('express');
var router = express.Router();

var member = require('../models/members');
var group = require('../models/group');


router.get('/', member.getAll, renderIndex);
router.get('/new', member.getAll ,group.getAll, renderNew);
router.get('/:id', member.find, group.findByMember , renderShow);
router.get('/:id/edit', member.find,group.getAll, renderEdit);


router.post('/', member.create, redirectShow);
router.put('/:id', member.update, redirectIndex);
router.delete('/:id', member.delete, redirectIndex);

function renderIndex(req, res){
  var mustacheVariables = {
    members: res.locals.members
  }
  res.render('./member/index', mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = {
    member: res.locals.member,
    groups: res.locals.groups 
   
  }
  res.render('./member/show', mustacheVariables);
}
function renderNew(req, res) {
    var mustacheVariables = {
      member: res.locals.member,
      groups: res.locals.groups 
    }
    res.render('./member/new', mustacheVariables);
  }
  
  function renderEdit(req, res) {
    var mustacheVariables = {
        member: res.locals.member,
        groups: res.locals.groups 
    }
    res.render('./member/edit', mustacheVariables);
  }
  
  function redirectIndex(req,res){
    res.redirect('/member');
  }
  
  function redirectShow(req, res) {
    res.redirect(`/member/${res.locals.member_id}`);
  }
  

module.exports = router;