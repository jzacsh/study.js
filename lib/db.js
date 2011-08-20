var mongoose = require('mongoose');

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
    slug : {
        type: String
      , lowercase: true
      , trim: true
      , index: true
     }
  , description : String
  , date        : { type: Date, default: Date.now }
});

Card.methods.getStack = function (callback) {
  return this.db.model('Stack').findById(this.stack, callback);
}

Stack.methods.findCards = function (callback) {
  return this.db.model('Card').find({ stack: this.ObjectId}, callback);
}

//actually define the models:
exports.Card = mongoose.model('Card', Card);
exports.Stack = mongoose.model('Stack', Stack);
