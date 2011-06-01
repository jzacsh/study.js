var querystring = require('querystring');
var options = require('./options.js').default.resolve;

//internal wrapper/api around res.write() methods.
var respond = function (res, content, overw) {
    var opt;
    //overwrite default options
    if (typeof(overw) === 'object') {
        var overwritten;
        //safely clone `options` object.
        opt = function(obj) {
            var clone, key;
            if (obj == null || typeof(obj) !== 'object') {
                return obj;
            }

            clone = obj.constructor();

            for (key in obj) {
                clone[key] = obj[key];
            }

            return clone;
        }(options);

        overwritten = function (orig, mod) {
            var key;
            for (key in mod) {
                orig[key] = mod[key]; //the actual overwrite
            }
            return orig;
        }(opt, overw);
    }
    else {
        opt = options; //no overwrite occuring
    }

    //run the regular drill
    res.writeHead(opt.HttpStatus, { 'Content-Type': opt.ContentType});
    res.write(content);
    if (opt.end) {
        res.end();
    }
}

var handlers = [];
handlers['/cards'] = function(response, POST) {
    console.log('request handler for a listing of "/cards".');
    respond(response, '<h2>not yet built!</h2><p>This is a listing of stacks of flash cards.</p>',
        { HttpStatus: 404 });
}
handlers['/cards/add'] = function(response, POST) {
    console.log('request handler for a listing of "/cards/add".');
    respond(response, '<h2>not yet built!</h2><p>This is a webform to create a new stack of flash cards.</p>',
        { HttpStatus: 404 });
}
//@TODO: now does express-js parse :stack?
    /*
handlers['/cards/edit/:stack'] = function(response, POST) {
    console.log('request handler for a listing of "/cards/edit/:stack".');
    respond(response, '<h2>not yet built!</h2><p>This is a webform to edit an existing stack of flash cards.</p>',
        { HttpStatus: 404 });
}
handlers['/cards/edit/:stack/:card'] = function(response, POST) {
    console.log('request handler for a listing of "/cards/edit/:stack/:card".');
    console.log('POST data passed in was: %s', querystring.parse(POST));
    respond(response, '<h2>not yet built!</h2><p>This is a webform to edit a specific, existing flash card.</p>',
        { HttpStatus: 404 });
}
  */ //@TODO: fix the above TODO!!

exports.handlers = handlers;
