var express = require('express');
var router = express.Router();

var project = require('../models/projects');
var group = require('../models/group');
var task = require('../models/tasks');
var client = require('../models/clients');


router.get('/new', project.getAll, renderNew);
router.get('/:id/edit', project.find, task.getAll,client.getAll,project.getAll, renderEdit);
router.get('/:id', project.find, group.findByProject , client.findByProject ,task.getAll ,  renderShow);
router.get('/', project.getAll, renderIndex);

router.post('/', project.create, redirectShow);
router.put('/:id', project.update, redirectShow);
router.delete('/:id', project.delete, redirectIndex);

function renderIndex(req, res){
  var mustacheVariables = {
    projects: res.locals.projects
  }
  res.render('./project/index', mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = {
    project: res.locals.project,
    tasks: res.locals.tasks ,
    groups: res.locals.groups , 
    clients: res.locals.clients
  }
  // res.send('sajndjasnj');
  res.render('./project/show',mustacheVariables);
}
function renderNew(req, res) {
    var mustacheVariables = {
      project: res.locals.project
    }
    res.render('./project/new', mustacheVariables);
  }
  
  function renderEdit(req, res) {
    var mustacheVariables = {
        project: res.locals.project,
        // tasks: res.locals.tasks ,
        groups: res.locals.groups , 
        clients: res.locals.clients
    }
    res.render('./project/edit', mustacheVariables);
  }
  
  function redirectIndex(req,res){
    res.redirect('/project');
  }
  
  function redirectShow(req, res) {
    res.redirect(`/project/${res.locals.projectId}`);
  }
  

module.exports = router;