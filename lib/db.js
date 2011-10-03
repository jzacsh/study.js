var mongoose = require('mongoose');
var util = require('util'); //@TODO: remove me!!    

mongoose.connect('mongodb://localhost/study');

//define and register a schema
mongoose.model('Card', new mongoose.Schema({
    stack   : { type: String, index: true }
  , front   : String
  , back    : String
  , right   : Number
  , wrong   : Number
  , created : Date
}));


//wrappers around our common queries
var inquiries = {
    findCards: function (requested, callback) {
      //mongoose.model('Card').find({ stack: requested}, callback);
    }
  , findStacks: function (callback) {
      mongoose.model('Card').collection.distinct('stack', callback);
      //@TODO: perhaps run map/reduce in future, if not overkill, to get
      // something like:
      // SELECT DISTINCT stack, COUNT(stack) FROM cards GROUP BY stack;
    }
  , getCard: function (callback) {
      //@TODO: write this!!!     
    }
  , getStack: function (data, callback) {
      mongoose.model('Card').find( { 'stack': data.stack }, callback);
    }
};

exports.inquiries = inquiries;
exports.mongoose = mongoose;

