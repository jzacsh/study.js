var url = require('url');

//clean redirect handler without chopping off query strings and hashes
module.exports.redirectIntact = function (req) {
  var u = url.parse(req.url)
    , search = u.search
    , hash = u.hash;
  search = (u.search === undefined)? '' : u.search;
  hash = (u.hash === undefined)? '' : u.hash;

  return { search: search, hash: hash };
}

//@TODO: remove this! (see ../todo)
module.exports.appendPath = function (req, res, append) {
  var direction = module.exports.redirectIntact(req);
  res.redirect(url.parse(req.url).pathname
    + '/' + append + direction.search + direction.hash);
}

//@TODO: remove this! (see ../todo)
//clean redirect handler without chopping off query strings and hashes
module.exports.add_cssjs = function(req, fType, file) {
  if (false || (fType !== 'scripts' &&
      fType !== 'styles')) {
    return false;
  }

  var _default = function () {
    var _head = { scripts: [], styles: []};

    _head[fType].push(file);
    return _head;
  };

  //actual work
  if ('head' in req) {
    if ('scripts' in req.head &&
      'styles' in req.head) {
      //overwrite the old
      req.head[fType].push(file);
    }
    else {
      //we have a malformed object
      req.head = _default();
    }
  }
  else {
    //this is our first run
    req.head = _default();
  }
}

