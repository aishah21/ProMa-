var express = require('express');
var app = express();
var port = 3000;


var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var logger = require('morgan');
app.use(logger('dev'));

app.use('/static', express.static(__dirname + '/public'));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));


var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

var clientController = require('./controllers/clientController')
app.use('/client' , clientController);

var groupController = require('./controllers/groupController')
app.use('/group' , groupController);

var memberController = require('./controllers/memberController')
app.use('/member' , memberController);

var projectController = require('./controllers/projectController')
app.use('/project' , projectController);

var taskController = require('./controllers/taskController');
app.use('/task' , taskController);

var usersController = require('./controllers/usersController')
app.use('/users' , usersController);

var sessionsController = require('./controllers/sessionsController');
app.use('/login', sessionsController);

var sessionsController = require('./controllers/sessionsController');

app.get('/', function(req,res){
  res.render('./home');
});

app.get('/admin',function(req,res){
  res.render('./index');
});

app.get('/login',function(req,res){
  res.render('./index');
});

app.listen(port, function(){
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
});