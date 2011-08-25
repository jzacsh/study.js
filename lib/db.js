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

//actually define the models:
exports.Card = mongoose.model('Card', Card);
exports.Stack = mongoose.model('Stack', Stack);
//@TODO: this seems like a hack! how the hell are methods supposed to be accessed??
exports.mongoose = mongoose;

