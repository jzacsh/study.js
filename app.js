
/**
 * Module dependencies.
 */

var express = require('express');
var util = require('util');
var url = require('url');
var study = require('./lib/study');
var routes = require('./lib/routes');
// var db = require('./lib/db_prototype'); //@TODO: use an actual database!
var db = require('./lib/db');

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
  global_header: function() { return app.settings.head; }
});

app.dynamicHelpers({
  custom_header: function(req, res) {
    if ('head' in req) {
      return {
        scripts: req.head.scripts || [],
        styles: req.head.styles || []
      };
    }
    else {
      return { scripts: [], styles: [] };
    }
  }
});

//setting framework for js files
app.set('head', {
  scripts: [
    'lib/jquery.min.js',
    'lib/raphael-min.js',
    'lib/site-core.js',
  ],
  styles: [
    'style.css'
  ]
});

// Routes

app.get('/', routes.get['/']);

//@TODO: use middleware to load cards and/or stack for common URLs
// eg.: learn about middleware: http://www.screenr.com/elL

//@TODO: learn form handling!
//redirect [ url + /new ]
app.get('/stack/new', routes.get['/stack/new']);
app.get('/stack', routes.get['/stack/new']);

app.get('/export/xml', routes.get['/export/xml']);
app.get('/export/json', routes.get['/export/json']);
app.get('/export', routes.get['/export/xml']);

app.get('/stack/:name', routes.get['/stack/:name']);

app.get('/stack/:name/export/xml', routes.get['/stack/:name/export/xml']);
app.get('/stack/:name/export/json', routes.get['/stack/:name/export/json']);
app.get('/stack/:name/export', routes.get['/stack/:name/export/xml']);

app.get('/stack/:name/card/new', routes.get['/stack/:name/card/new']);
app.get('/stack/:name/card', routes.get['/stack/:name/card/new']);

app.get('/stack/:name/card/:id', routes.get['/stack/:name/card/:id']);

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);

