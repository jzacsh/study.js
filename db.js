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


var stacks = [
  {
    name: 'history',
    info: 'United States History',
    cards: [
      {
        front: 'Who was the first president?',
        back: 'George Washington'
      },
      {
        front: 'What year was the decleration of independence.',
        back: '1776'
      }
    ]
  },
  {
    name: 'science',
    info: 'Periodic Table of Elements',
    cards: [
      {
        front: 'what is "H"?',
        back: 'Hydrogen'
      },
      {
        front: 'what is "AU"?',
        back: 'Gold'
      },
      {
        front: 'what is "CO"?',
        back: 'Cobalt'
      }
    ]
  },
  {
    name: 'italian',
    info: 'Foreign language - course 1',
    cards: [
      {
        font: 'la mia ragattsa',
        back: 'my girlfriend'
      },
      {
        font: 'io oh makine rossa',
        back: 'I have a red car.'
      },
      {
        font: 'io oh makine rossa',
        back: 'I have a red car.'
      }
    ]
  }
];

exports.stacks = stacks;
exports.get = get;

