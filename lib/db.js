var mongoose = require('mongoose');
var util = require('util'); //@TODO: remove me!!    

mongoose.connect('mongodb://localhost/study');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Card = new Schema({
    stack   : { type: ObjectId, index: true }
  , front   : String
  , back    : String
  , right   : Number
  , wrong   : Number
  , created : Date
});

var Stack = new Schema({
    _id : {
        type: String
      , lowercase: true
      , trim: true
      , index: true
     }
  , description : String
  , date        : { type: Date, default: Date.now }
  , qty         : Number // approximate number of Card docs with this _id
});

var inquiries = {
    findCards: function (db, callback) {
      //return db.model('Card').find({ stack: this.ObjectId}, callback);
      return null;
    }
  , findStacks: function (db, callback) {
      var stack = [];
      db.model('Stack').find({}, function(err, docs) {
        if (!err) {
          docs.forEach(function (stack_slug) {
            stack.push(stack_slug);
          });
        }
        callback(err, stack);
      });
    }
  , getCard: function (db, callback) {
      //@TODO: write this!!!     
    }
  , getStack: function (db, data, callback) {
      return db.model('Card').find( { 'stack': data.stack }, callback);
    }
};

//register the schemas
mongoose.model('Card', Card);
mongoose.model('Stack', Stack);

exports.inquiries = inquiries;
exports.mongoose = mongoose;

