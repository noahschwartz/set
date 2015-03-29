var test = require('unit.js');

var _ = require('lodash');
var math = require('mathjs');
var Set = require('../lib/set');

it('Check for single exact set', function ()
{
  var cards = require('../cards6');

  var solver = new Set(cards, { cardsInSet: 3, useVectorGenerator: false });

  var validSets = solver.validSets();
  test.must(validSets.length).equal(1);

  var same = _.isEqual(validSets[0], cards);
  test.must(same).equal(true);
});

it('Check for no solutions', function ()
{
  var cards = require('../cards7');

  var solver = new Set(cards, { cardsInSet: 3, useVectorGenerator: false });

  var validSets = solver.validSets();
  test.must(validSets.length).equal(0);
});

it('Check for too few cards', function ()
{
  var cards = require('../cards7');

  test.exception(function ()
  {
    var solver = new Set(cards, { cardsInSet: 4, useVectorGenerator: false });
  });
});

it('Check big deck 1 using bit', function ()
{
  var cards = require('../cards4');

  var solver = new Set(cards, { cardsInSet: 3, useVectorGenerator: false });

  var validSets = solver.validSets();
  test.must(validSets.length).equal(math.combinations(cards.length, 3));
});

it('Check big deck 2 using bit', function ()
{
  var cards = require('../cards5');

  var solver = new Set(cards, { cardsInSet: 3, useVectorGenerator: false });

  var validSets = solver.validSets();
  test.must(validSets.length).equal(math.combinations(cards.length, 3));
});

it('Check big deck 1 using vector', function ()
{
  var cards = require('../cards4');

  var solver = new Set(cards, { cardsInSet: 3, useVectorGenerator: true });

  var validSets = solver.validSets();
  test.must(validSets.length).equal(math.combinations(cards.length, 3));
});

it('Check big deck 2 using vector', function ()
{
  var cards = require('../cards5');

  var solver = new Set(cards, { cardsInSet: 3, useVectorGenerator: true });

  var validSets = solver.validSets();
  test.must(validSets.length).equal(math.combinations(cards.length, 3));
});
