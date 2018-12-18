var bcrypt = require('bcrypt');
var db = require('../db/config');
var user = {};

user.getAll = function (req, res, next) {
  db.manyOrNone("SELECT * FROM users;")  
    .then(function (result) {   
      res.locals.user = result;  
      next();
    })
    .catch(function(error){ 
      console.log(error); 
      next(); 
    })
}
user.find = function(req, res, next){
  db.one("SELECT * FROM users WHERE id=$1;", [req.params.id])
    .then(function(result){
      res.locals.user = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

user.create = function(req, res, next){
  db.one("INSERT INTO users (email, password_digest) VALUES($1, $2) RETURNING *;",
        [req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10)])
    .then(function(result){
      req.session.user = result;
      res.locals.userId = result.id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}
user.findByMember= function (req, res, next) {
  db.manyOrNone("SELECT * FROM users WHERE member_id=$1;", [req.params.id])
    .then(function (result) {
      res.locals.users = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}  

module.exports = user;