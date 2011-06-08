
/**
 * Module dependencies.
 */

var express = require('express');
var db = require('./db'); //@TODO: use an actual database!

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

//@TODO: learn about pulling stuff out into middleware functions (modules,
//etc.)

app.get('/stack', function(req, res) {
  res.render('stack', {
    title: 'Create a new stack of Flash Cards',
  });
});

app.get('/stack/:name', function(req, res) {
  res.render('stack/stack', {
    title: '"' + req.params.name + '" Flash Cards',
    stacks: db.stacks, //@TODO: search this stack for something by the name of req.params.name
  });
});

app.get('/stack/:name/card', function(req, res) {
  res.render('card', { //@TODO: this uses index.jade?
    title: 'Create a new flash card in the "' + req.params.name + '" stack', //@TODO: search this stack for something by the name of req.params.name,
    stack: db.stacks, //@TODO: search this stack for something by the name of req.params.name
  });
});

app.get('/stack/:name/card/:id', function(req, res) {
  res.render('views/card/card', { //@TODO: this uses card.jade?
    title: 'Flash card number: ' + req.params.id,
    stacks: db.stacks, //@TODO: search this stack for something by the name of req.params.name
  });
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);

