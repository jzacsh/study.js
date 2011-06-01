var http = require('http');
var url = require('url');

var start = function(router, options) {
    var onRequest = function(req, res) {
        var uri_path =  url.parse(req.url).pathname,
            http_POST = '';

        req.setEncoding('utf8');
        req.addListener('data', function(http_POST_chunk) {
            http_POST += http_POST_chunk;
        });
        req.addListener('end', function() {
            router(res, uri_path);
        });
    }

    http.createServer(onRequest).listen(options.server.port);
}

exports.start = start;
