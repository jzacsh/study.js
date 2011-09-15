/**
 * All callbacks for a given route, by HTTP method.
 */

var study = require('./study');
var db = require('./db_prototype'); //@TODO: remove me!!    
var db_real = require('./db');

var util = require('util'); //@TODO: remove me!!    
db_real.inquiries.listStacks(db_real.mongoose, function (err, stack) {
  console.log('output from mongodb is:'); //@TODO: remove me!!    
  console.log(util.inspect(stack, false, null)); //@TODO: remove me!!    
});
console.log('end output'); //@TODO: remove me!!    

exports = module.exports = { get: {}, post: {}, delete: {}};

module.exports.get['/'] = function(req, res){
  study.add_cssjs(req, 'scripts', 'site-ui.js');
  study.add_cssjs(req, 'styles', 'index.css');

  res.render('index', {
    title: 'study.js',
    stacks: db.stacks,
  });
};

module.exports.get['/stack/new'] = function(req, res) {
  res.render('stack', {
    title: 'Create a new stack of Flash Cards',
    stacks: db.stacks,
  });
};

module.exports.get['/export/xml'] = function(req, res) {
  res.send('FPO: export/xml response here');
};

module.exports.get['/export/json'] = function(req, res) {
  res.send('FPO: export/JSON response here');
};

module.exports.get['/stack/:name'] = function(req, res) {
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
};

module.exports.get['/stack/:name/export/xml'] = function(req, res) {
  res.send('FPO: /stack/:name/export/xml response here');
};

module.exports.get['/stack/:name/export/json'] = function(req, res) {
  res.send('FPO: /stack/:name/export/JSON response here');
};

module.exports.get['/stack/:name/card/new'] = function(req, res) {
  var stack_name = db.get(db.stacks, 'name', req.params.name).name;
  res.render('card', {
    title: 'Create a new flash card in the "' + stack_name + '" stack',
    stack_name: stack_name,
  });
};

module.exports.get['/stack/:name/card/:id'] = function(req, res) {
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
};

