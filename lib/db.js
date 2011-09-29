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
});

var inquiries = {
    findCards: function (mongoose, callback) {
      //return db.model('Card').find({ stack: this.ObjectId}, callback);
      return null;
    }
  , getStack: function (mongoose, callback) {
      //return db.model('Stack').findById(this.stack, callback);
      return null;
    }
  , listStacks: function (mongoose, callback) {
      var stack = [];
      mongoose.model('Stack').find({}, { _id: true }, function(err, docs) {
        if (!err) {
          docs.forEach(function (stack_slug) {
            stack.push(stack_slug);
          });
        }
        callback(err, stack);
      });
    }
};

//register the schemas
mongoose.model('Card', Card);
mongoose.model('Stack', Stack);

exports.inquiries = inquiries;
exports.mongoose = mongoose;

