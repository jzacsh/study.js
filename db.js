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
    name: 'history',
    info: 'United States History',
    cards: [
      {
        front: 'Who was the first president?',
        back: 'George Washington',
        right: 0,
        wrong: 3
      },
      {
        front: 'what year was the decleration of independence.',
        back: '1776'
        right: 4,
        wrong: 0
      },
    ]
  }
  {
    name: 'italian',
    info: 'Foreign language - course 1',
    cards: [
      {
        front: 'la mia ragattsa',
        back: 'my girlfriend'
      },
      {
        front: 'io oh makine rossa',
        back: 'I have a red car.'
      },
      {
        front: 'io oh andare in Italia',
        back: 'I want to go to Italy.'
      }
    ]
  }
];

exports.stacks = stacks;
exports.get = get;

