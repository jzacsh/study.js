var options = {
    server: {
        port: 8888,
    },
    default: {
        resolve: {
            HttpStatus: 200,
            ContentType: 'text/html',
            end: true,
        },
    }
};

//place everything in the global exported space:
var exporter = function(imp, exp) {
    //@TODO: figure out how to do this - this is borked.
    var key;
    for (key in imp) {
        exp[key] = imp[key];
    }
}(options, exports);
