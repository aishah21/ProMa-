var db = require('../db/config');
var project = {};


project.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM projects;")  
      .then(function (result) {   
        res.locals.projects = result;  
        next();
      })
      .catch(function(error){ 
        console.log(error); 
        next(); 
      })
  }
  project.find = function (req, res, next) {
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM projects WHERE id = $1;", [id])
      .then(function(result){
        res.locals.project = result;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
    }

    project.create = function(req, res, next){

      console.log("body",req.body)
        var projectData = {
            name: req.body.name ,
            descripition:req.body.descripition ,
            note : req.body.note ,
            status : req.body.status ,
            startDate:req.body.start_date ,
            endDate : req.body.end_date ,
            cost: req.body.cost,
            field:req.body.field,
            groupId : req.body.group_id ,
            clientId : req.body.client_id
        }
        db.one(
          `INSERT INTO projects
          (name, descripition, note, status, start_date, end_date, cost, field, group_id, client_id)
          VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8 ,$9 ,$10) RETURNING id;`,
          [projectData.name , projectData.descripition , projectData.note , projectData.status , projectData.startDate , projectData.endDate ,projectData.cost ,projectData.field ,projectData.groupId , projectData.clientId])
          .then(function (result) {
            console.log(result)
            res.locals.project_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
      project.delete = function(req, res, next){
        db.none('DELETE FROM projects WHERE id=$1;', [req.params.id])
          .then(function(){
            console.log('successful delete');
            next();
          })
          .catch(function(error){
            console.log(error);
            next();
          })
      }

      project.update = function(req, res, next){

          var projectData = {
            name: req.body.name ,
            descripition:req.body.descripition ,
            note : req.body.note ,
            status : req.body.status ,
            startDate:req.body.start_date ,
            endDate : req.body.end_date ,
            cost: req.body.cost,
            field:req.body.field,
            groupId : req.body.group_id ,
            clientId : req.body.client_id
        }
        console.log(req.body)
db.one(
          `UPDATE  projects SET 
          name=$1 , descripition=$2 , note=$3, status=$4, start_date=$5, end_date=$6, cost=$7, field=$8 ,group_id=$9 ,client_id=$10) ;`,
          [projectData.name , projectData.descripition , projectData.note , projectData.status , projectData.startDate , projectData.endDate ,projectData.cost ,projectData.field ,projectData.groupId , projectData.clientId])
          .then(function (result) {
            console.log(result)
            res.locals.project_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
      
      project.findByTask = function (req, res, next) {
        db.manyOrNone("SELECT projects.name from projects , tasks where tasks.project_id =$1 and projects.id= tasks.project_id;", [req.params.id])
          .then(function (result) {
            res.locals.projects = result;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
module.exports = project;

