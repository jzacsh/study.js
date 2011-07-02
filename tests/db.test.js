var db = require('../lib/db');
var assert = require('assert');
var should = require('should');

/**
 * This is a throw-away test just to get used to TDD. The methods of my db.js
 * lib should not be needed once I'm using a real data store and real db
 * driver.
 */

//example data
var stacks = [
  {
    name: 'italian',
    info: 'Foreign language - course 1',
    cards: [
      {
        front: 'la mia ragattsa',
        back: 'my girlfriend',
        right: 1,
        wrong: 0
      }
    ]
  },
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
        back: '1776',
        right: 4,
        wrong: 0
      },
    ]
  }
];

//tests
module.exports = {
  "db.get() should pull the entire object from store, intact.": function() {
    var reqParam = 'history';
    var actual = stacks[1];

    var stack = db.get(stacks, 'name', reqParam);
    assert.deepEqual(actual, stack);
  }
}
