//@TODO: use an actual database

/**
 * @NOTE
 *   This is just example data to avoid dealing with the database layer, until I feel like it.
 *   However, this schema feels right.
 */

var get = function(obj, key, val) {
  var o;
  for (o in obj) {
    if (obj[o][key] == val) {
      return obj[o];
    }
  }
  return false;
};

// CURRENTLY USING OPTION 2: //@TODO: probably pick optino 1 from below
//
// cards is a *collection* of  *documents* representing each card.
//
// Each document has its respective stack's info _inside_ the card. (pros/cons?
// will this make it difficult to query on stack attributes?)
var stacks = [
    {
        _id: 'history' //english primary key to look up stack from
      , description: 'United States History' //sentence description of stack
      , date: 1313948911038 //UNIX timestamp, last modified
      , qty: 2 // approximate number of Card docs with this _id
    }
  , {
        _id: 'italian'
      , description: 'Foreign language - course 1'
      , date: 1313948801038
      , qty: 3
    }
];

var cards = [
    {
        stack: { type: 'history', index: true }
      , front: 'Who was the first president?'
      , back: 'George Washington'
      , right: 0
      , wrong: 3
      , created: 1313948911038
    }
  , {
        stack: { type: 'history', index: true }
      , front: 'what year was the decleration of independence.'
      , back: '1776'
      , right: 4
      , wrong: 0
      , created: 1313948912001
    }
  , {
        stack: { type: 'italian', index: true }
      , front: 'la mia ragattsa'
      , back: 'my girlfriend'
      , right: 1
      , wrong: 0
      , created: 1313948912001
    }
  , {
        stack: { type: 'italian', index: true }
      , front: 'io oh makine rossa'
      , back: 'I have a red car.'
      , right: 0
      , wrong: 0
      , created: 1313948912001
    }
  , {
        stack: { type: 'italian', index: true }
      , front: 'io oh andare in Italia'
      , back: 'I want to go to Italy.'
      , right: 0
      , wrong: 1
      , created: 1313948912001
    }
];

exports.stacks = stacks;
exports.cards = cards;
exports.get = get;





//
//@TODO: pick a schema! (listed depest to flattest).
//


// NOTE: to self, sql-ishness:
// a collection == a table
// a document == a row



//option 1:

// cards is a *collection* of *documents* representing each card
//
// Each stack-name/info data is repeated for each card. this drives up
// harddrive space but makes querying simpler.
// Put an index on stack_name and this should be the best option.
var cards = [
  {
    stack_name: 'history',
    stack_info: 'United States History',
    front: 'Who was the first president?',
    back: 'George Washington',
    right: 2,
    wrong: 1
  },
  {
    stack_name: 'Science',
    stack_info: 'Periodic Table of Elements',
    front: 'what is "H"?',
    back: 'Hydrogen',
    right: 2,
    wrong: 3
  },
  {
    stack_name: 'history',
    stack_info: 'united states history',
    front: 'what year was the decleration of independence.',
    back: '1776',
    right: 0,
    wrong: 1
  }
]



//option 2:

// cards is a *collection* of  *documents* representing each card.
//
// Each document has its respective stack's info _inside_ the card. (pros/cons?
// will this make it difficult to query on stack attributes?)
// Also seems this will only be advantageous if I frequently query to return
// *all* card documents in a stack.
var stacks_embedded = [
  {
    name: 'italian',
    info: 'Foreign language - course 1',
    cards: [
      {
        front: 'la mia ragattsa',
        back: 'my girlfriend',
        right: 3,
        wrong: 1
      },
      {
        front: 'io oh makine rossa',
        back: 'I have a red car.',
        right: 2,
        wrong: 1
      },
      {
        front: 'io oh andare in Italia',
        back: 'I want to go to Italy.',
        right: 0,
        wrong: 1
      }
    ]
  }
];



//option 3:

// stacks is a *collection* of *documents* representing each stack.
//
// Each "stack" document has an embedded document of ..?? (is this possible? or
// would this just be via foreign key place holder for the card: property,
// meaning I'm trying to do SQL in noSQL world).

var cards_stand_alone = [
  {
    _id: 'primary key', //used by stacks_referenced
    front: 'Who was the first president?',
    back: 'George Washington',
    right: 3,
    wrong: 6
  },
  {
    _id: 'primary key', //used by stacks_referenced
    front: 'what is "H"?',
    back: 'Hydrogen',
    right: 0,
    wrong: 1
  },
  {
    _id: 'primary key', //used by stacks_referenced
    front: 'what year was the decleration of independence.',
    back: '1776',
    right: 4,
    wrong: 2
  }
]

var stacks_referenced = [
  {
    name: 'history',
    info: 'United States History',
    cards: cards._id, //see cards_stand_alone
  },
  {
    name: 'science',
    info: 'Periodic Table of Elements',
    cards: cards._id, //see cards_stand_alone
  },
];

