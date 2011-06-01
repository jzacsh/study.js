var server = require('./server.js');
var router = require('./router.js').router;
var options = require('./options.js');

server.start(router, options);
console.log('server started successfully');
