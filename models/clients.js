var db = require('../db/config');
var client = {};


client.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM clients;")  
      .then(function (result) {   
        console.log("+++++++++++++",res.locals.clients); 
        res.locals.clients = result;  
        next();
      })
      .catch(function(error){ 
        console.log(error); 
        next(); 
      })
  }
  client.find = function (req, res, next) {
    var id = req.params.id;
    console.log("************",id);
    db.oneOrNone("SELECT * FROM clients WHERE id = $1;", [id])
      .then(function(result){
        res.locals.client = result;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
    }

    client.create = function(req, res, next){

      console.log("body",req.body)
        var clientData = {
            name: req.body.name ,
            phone:req.body.phone ,
            address : req.body.adress ,
            email : req.body.email ,
           userId : req.body.user_id
        }
        db.one(
          `INSERT INTO clients
          (name, phone, adress, email, user_id)
          VALUES ($1 ,$2 ,$3 ,$4 ,$5 ) RETURNING id;`,
          [clientData.name , clientData.phone , clientData.address ,clientData.groupId , clientData.userId])
          .then(function (result) {
            console.log(result)
            res.locals.client_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
      client.delete = function(req, res, next){
        db.none('DELETE FROM client WHERE id=$1;', [req.params.id])
          .then(function(){
            console.log('successful delete');
            next();
          })
          .catch(function(error){
            console.log(error);
            next();
          })
      }

      client.update = function(req, res, next){

        var clientData = {
            name: req.body.name ,
            phone:req.body.phone ,
            address : req.body.adress ,
            email : req.body.email ,
           userId : req.body.user_id
        }
        console.log(req.body)
    db.one(
          `UPDATE  clients SET 
          name=$1 , phone=$2 , adress=$3, email=$4, user_id=$5) ;`,
          [clientData.name , clientData.phone , clientData.address  ,clientData.email ,clientData.userId])
          .then(function (result) {
            console.log(result)
            res.locals.client_id = result.id;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
      
      client.findByProject = function (req, res, next) {
        db.manyOrNone("SELECT * FROM clients WHERE project_id=$1;", [req.params.id])
          .then(function (result) {
            res.locals.clients = result;
            next();
          })
          .catch(function (error) {
            console.log(error);
            next();
          })
      }
module.exports = client;