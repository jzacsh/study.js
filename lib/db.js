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

Card.methods.getStack = function (callback) {
  return this.db.model('Stack').findById(this.stack, callback);
}

Stack.methods.listStacks = function (callback) {
  return this.db.model('Stack').find({}, { _id: true}, callback);
}

Stack.methods.findCards = function (callback) {
  return this.db.model('Card').find({ stack: this.ObjectId}, callback);
}

//actually define the models:
exports.Card = mongoose.model('Card', Card);
exports.Stack = mongoose.model('Stack', Stack);
//@TODO: this seems like a hack! how the hell are methods supposed to be accessed??
exports.methods = {
    Stack: mongoose.modelSchemas.Stack.methods
  , Card: mongoose.modelSchemas.Card.methods
};
exports.mongoose = mongoose;

