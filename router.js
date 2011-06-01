var handlers = require('./views.js').handlers;

var responder = function(res, path, http_POST) {
    if (typeof handlers[path] === 'function') {
        handlers[path](res, http_POST);
    }
    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.write('No page found at "' + path + '".');
        res.end();
    }
}

exports.router = responder;
