
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Flash Cards, Node.js &ndash; Powered'
  });
});

var Users = [
  { name: 'bob', email: 'bob@bob.com' },
  { name: 'tom', email: 'tom@tom.com' },
  { name: 'jon', email: 'jon@jon.com' },
  { name: 'drew', email: 'drew@drew.com' },
];

app.get('/users', function(req, res) {
  res.render('users', {
    title: 'Users',
    users: Users,
  });
});

function loadUser(req, res, next) {
  Users.find(req.params.id, function(err, user) {
    if (! user) return next(new Error('Failed to load user.'));
    req.user = user;
    next();
  });
}

app.get('/user/:id', loadUser, function(req, res, next) {
  res.render('users/show', { user: req.user } );
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
