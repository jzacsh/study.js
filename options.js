options = {
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
    var key;
    for (key in imp) {
        exp[key] = imp[child];
    }
}(options, exports);
