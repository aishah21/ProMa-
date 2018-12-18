var express = require('express');
var router = express.Router();

var task = require('../models/tasks');
var project = require('../models/projects');
var group = require('../models/group');
var member = require('../models/members');

router.get('/new', task.getAll, renderNew);
router.get('/:id/edit', task.find, project.getAll,group.getAll,member.getAll, renderEdit);
router.get('/:id', task.find, project.findByTask  , member.findByTask, renderShow);
router.get('/', task.getAll, renderIndex);


router.post('/', task.create, redirectShow);
router.put('/:id', task.update, redirectShow);
router.delete('/:id', task.delete, redirectIndex);

function renderIndex(req, res){
  var mustacheVariables = {
    tasks: res.locals.tasks
  }
  res.render('./task/index', mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = {
    task: res.locals.task,
    projects: res.locals.projects ,
    members:res.locals.members
   
    
  }
  res.render('./task/show', mustacheVariables);
}
function renderNew(req, res) {
    var mustacheVariables = {
      task: res.locals.task
    }
    res.render('./task/new', mustacheVariables);
  }
  
  function renderEdit(req, res) {
    var mustacheVariables = {
      task: res.locals.task,
    projects: res.locals.projects ,
    members:res.locals.members
      
    }
    res.render('./task/edit', mustacheVariables);
  }
  
  function redirectIndex(req,res){
    res.redirect('/task');
  }
  
  function redirectShow(req, res) {
    res.redirect(`/task/${res.locals.taskId}`);
  }
  

module.exports = router;