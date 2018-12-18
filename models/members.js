var db = require('../db/config');
var member = {};


member.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM members;")  
      .then(function (result) {   
        res.locals.members = result;  
        next();
      })
      .catch(function(error){ 
        console.log(error); 
        next(); 
      })
  }
  member.find = function (req, res, next) {
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM members WHERE id = $1;", [id])
      .then(function(result){
        res.locals.member = result;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
    }

    member.create = function(req, res, next){

      console.log("body",req.body);
        var memberData = {
            name: req.body.name ,
            email:req.body.descripition ,
            specialized : req.body.specialized
            // groupId : req.body.group_id
        };
        db.one(
          `INSERT INTO members
          (name, email, specialized)
          VALUES ($1 ,$2 ,$3) RETURNING id;`,
          [memberData.name , memberData.email , memberData.specialized])
          .then(function (result) {
            console.log(result)
            res.locals.member_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          });
      }
      member.delete = function(req, res, next){
        db.none('DELETE FROM members WHERE id=$1;', [req.params.id])
          .then(function(){
            console.log('successful delete');
            next();
          })
          .catch(function(error){
            console.log(error);
            next();
          })
      }

    //   member.update = function(req, res, next){

    //     var memberData = {
    //         name: req.body.name ,
    //         email:req.body.descripition ,
    //         specialized : req.body.specialized ,
    //         groupId : req.body.group_id
    //     }  
        
    //     console.log(req.body);
    // db.one(
    //       `UPDATE members SET 
    //       name=$1 , email=$2 , specialized=$4, group_id=$5 RETURNING id;`,
    //       [memberData.name , memberData.email  ,memberData.specialized , memberData.groupId])
    //       .then(function (result) {
    //         console.log(result)
    //         res.locals.member_id = result.id;
    //         next();
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //         next();
    //       });
    //   }

    member.update = function(req, res, next){

      // var memberData = {
      //     name: req.body.name ,
      //     email:req.body.descripition ,
      //     user_id : req.body.user_id
      // }  
      
      console.log(req.body);
  db.one(
        `UPDATE members SET 
        name=$1, email=$2 WHERE user_id=$3 RETURNING id;`,
        [ req.body.name ,req.body.email ,req.body.user_id])
        .then(function (result) {
          console.log(result);
          res.locals.member_id = result.id;
          next();
        })
        .catch(function (error) {
          console.log(error);
          next();
        });
    }
      member.findByGroup= function (req, res, next) {
        db.manyOrNone("SELECT * FROM members WHERE groub_id=$1;", [req.params.id])
          .then(function (result) {
            res.locals.members = result;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
      
      member.findByTask= function (req, res, next) {
        db.manyOrNone("SELECT members.name from members , tasks where tasks.project_id =$1 and members.id= tasks.member_id;", [req.params.id])
          .then(function (result) {
            res.locals.members = result;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }  


module.exports = member;