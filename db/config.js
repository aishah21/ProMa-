var pgPromise= require('pg-promise');
var pginstance = pgPromise();

var config = {
    host : 'localhost' ,
    port : 5432 , 
    database : 'proma_db' , 
    user : 'aishahalmaghrbi'
}

var connection = pginstance(config);
module.exports = connection ; 
