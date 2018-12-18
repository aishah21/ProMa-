var db = require('../db/config');
var group = {};


group.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM groups;")  
      .then(function (result) {  
        console.log("+++++++++++++",res.locals.groups); 
        res.locals.groups = result;  
        next();
      })
      .catch(function(error){ 
        console.log(error); 
        next(); 
      });
  }
  group.find = function (req, res, next) {
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM groups WHERE id = $1;", [id])
      .then(function(result){
        res.locals.group = result;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      });
    }

    group.create = function(req, res, next){

      console.log("body",req.body)
        var groupData = {
            name: req.body.name
        }
        db.one(
          `INSERT INTO groups
          (name)
          VALUES ($1) RETURNING id;`,
          [groupData.name])
          .then(function (result) {
            console.log(result)
            res.locals.group_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          });
      }
      group.delete = function(req, res, next){
        db.none('DELETE FROM groups WHERE id=$1;', [req.params.id])
          .then(function(){
            console.log('successful delete');
            next();
          })
          .catch(function(error){
            console.log(error);
            next();
          });
      }

      group.update = function(req, res, next){
        var groupData = {
            name: req.body.name
        }
        console.log(req.body)

        db.one("UPDATE groups SET name = $1;",
          [groupData.name ])
          .then(function (result) {
            console.log(result)
            res.locals.group_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          });
      }
      group.findByMember= function (req, res, next) {
        db.manyOrNone("SELECT groups.name from groups , members where members.user_id =$1 and groups.id= members.group_id;", [req.params.id])
          .then(function (result) {
            res.locals.groups = result;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          });
      }
      
      
module.exports = group;

