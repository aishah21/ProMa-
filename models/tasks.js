var db = require('../db/config');
var task = {};


task.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM tasks;")  
      .then(function (result) {   
        res.locals.tasks = result;  
        next();
      })
      .catch(function(error){ 
        console.log(error); 
        next(); 
      })
  }
  task.find = function (req, res, next) {
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM tasks WHERE id = $1;", [id])
      .then(function(result){
        res.locals.task = result;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
    }

    task.create = function(req, res, next){

      console.log("body",req.body)
        var taskData = {
            name: req.body.name ,
            descripition:req.body.descripition ,
            note : req.body.note ,
            status : req.body.status ,
            startDate:req.body.start_date ,
            endDate : req.body.end_date ,
            projectId : req.body.project_id ,
            memberId : req.body.member_id
        }
        db.one(
          `INSERT INTO tasks
          (name, descripition, note, status, start_date, end_date, project_id, member_id)
          VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8) RETURNING id;`,
          [taskData.name , taskData.descripition , taskData.note , taskData.status , taskData.startDate , taskData.endDate ,taskData.projectId , taskData.memberId])
          .then(function (result) {
            console.log(result)
            res.locals.task_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
      task.delete = function(req, res, next){
        db.none('DELETE FROM tasks WHERE id=$1;', [req.params.id])
          .then(function(){
            console.log('successful delete');
            next();
          })
          .catch(function(error){
            console.log(error);
            next();
          })
      }

      task.update = function(req, res, next){

          var taskData = {
            name: req.body.name ,
            descripition:req.body.descripition ,
            note : req.body.note ,
            status : req.body.status ,
            startDate:req.body.start_date ,
            endDate : req.body.end_date ,
            projectId : req.body.project_id ,
            memberId : req.body.member_id
        }
        console.log(req.body)
db.one(
          `UPDATE  tasks SET 
          name=$1 , descripition=$2 , note=$3, status=$4, start_date=$5, end_date=$6, project_id=$7, member_id=$8) ;`,
          [taskData.name , taskData.descripition , taskData.note , taskData.status , taskData.startDate , taskData.endDate ,taskData.projectId , taskData.memberId])
          .then(function (result) {
            console.log(result)
            res.locals.task_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }

      task.findByProject = function (req, res, next) {
        db.manyOrNone("SELECT * FROM tasks WHERE project_id=$1;", [req.params.id])
          .then(function (result) {
            res.locals.tasks = result;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
      
      

module.exports = task;