
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

//giving layout.jade access to list of js files
app.helpers({
  //@TODO: fix this var to be somehow static (not called multiple requests)
  header: function() { return app.settings.head; }
});

//setting framework for js files
app.set('head', {
  scripts: [
    'lib/jquery.min.js',
    'lib/raphael-min.js',
    'lib/site-core.js',
  ],
  styles: []
});

// Routes

app.get('/', function(req, res){
  app.settings.head.scripts.push('site-ui.js');
  res.render('index', {
    title: 'study.js',
    stacks: db.stacks,
  });
});

//@TODO: use middleware to load cards and/or stack for common URLs
// eg.: learn about middleware: http://www.screenr.com/elL

//@TODO: learn form handling!
app.get('/stack', function(req, res) {
  res.render('stack', {
    title: 'Create a new stack of Flash Cards',
    stacks: db.stacks,
  });
});

app.get('/stack/:name', function(req, res) {
  var stack = db.get(db.stacks, 'name', req.params.name);
  if (stack) {
    res.render('stack/stack', {
      title: 'Stack of ' + req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1) + ' cards',
      name: stack.name, //@TODO: figure out how to nest 2-deep in a partial!!
      cards: stack.cards,
    });
  }
  else {
    res.send('No stack named "' + req.params.name + '"!', 404);
  }
});

app.get('/stack/:name/card', function(req, res) {
  var stack_name = db.get(db.stacks, 'name', req.params.name).name;
  res.render('card', {
    title: 'Create a new flash card in the "' + stack_name + '" stack',
    stack_name: stack_name,
  });
});

//@TODO: learn form handling!
app.post('/stack/:name/card', function(req, res) {
  console.log(req.body);
  res.redirect('back');
});

app.get('/stack/:name/card/:id', function(req, res) {
  var found_card = db.get(db.stacks, 'name', req.params.name).cards[req.params.id];
  if (found_card) {
    res.render('card/card', { //@TODO: this uses card.jade?
      title: 'Flash card number: ' + req.params.id,
      card: found_card, //@TODO: search this stack for something by the name of req.params.name
    });
  }
  else {
    res.send('No card #"' + req.params.id + '"!', 404);
  }
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);

