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
            description:req.body.description ,
            note : req.body.note ,
            status : req.body.status ,
            startTime:req.body.start_time ,
            endTime : req.body.end_time ,
            projectId : req.body.project_id ,
            memberId : req.body.member_id
        }
        db.one(
          `INSERT INTO tasks
          (name, description, note, status, start_time, end_time , project_id, member_id)
          VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8) RETURNING id;`,
          [taskData.name , taskData.description , taskData.note , taskData.status , taskData.startTime , taskData.endTime ,taskData.projectId , taskData.memberId])
          .then(function (result) {
            console.log(result)
            res.locals.task_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log("error create task function ",error);
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
            status : req.body.status
        }
        console.log(req.body)
db.one(
          `UPDATE tasks SET status=$1 WHERE id=$2 RETURNING id;`,
          [taskData.status,req.params.id])
          .then(function (result) {
            console.log(result)
            res.locals.taskId = result.id;
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
          });
      }
      
      

module.exports = task;