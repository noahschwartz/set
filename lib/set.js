/*jshint -W083 */

var _ = require('lodash');
var util = require('util');

function Set (cards, options)
{
  this.cards = cards;
  this.options = options;

  if (this.options.cardsInSet <= 0)
  {
    console.error(util.format("A set must contain more than zero cards, you provided %d.", this.options.cardsInSet));
    throw new Error();
  }

  if (this.cards.length < this.options.cardsInSet)
  {
    console.error(util.format("A set must contain at least %d cards, you provided %d.", this.options.cardsInSet, this.cards.length));
    throw new Error();
  }

  var dimensions = _.keys(this.cards[0]);

  var sameDimensions = _.all(this.cards, function (card) { return _.isEqual(dimensions, _.keys(card)); });
  if (sameDimensions === false)
  {
    console.error(util.format("All cards must contain the same number of dimensions."));
    throw new Error();
  }
}

Set.prototype._isValid = function (possibleSet)
{
  var self = this;

  if (possibleSet.length === 0)
  {
    return false;
  }

  return _.all(_.keys(possibleSet[0]), function (key)
  {
    var values = { };

    _.each(possibleSet, function (card)
    {
      values[card[key]] = 0;
    });

    var numberOfValues = _.keys(values).length;
    return (numberOfValues === 1) || (numberOfValues === possibleSet.length);
  });
};

Set.prototype.validSets = function ()
{
  var self = this;

  var validSets = [ ];

  if (self.options.useVectorGenerator === false)
  {
    var CombinationsBit = require('./combinations_bit');
    var combinationsBit = new CombinationsBit(self.cards.length, self.options.cardsInSet);

    while (combinationsBit.hasMore())
    {
      combinationsBit.next(self.cards, function (combination)
      {
        if (self._isValid(combination))
        {
          validSets.push(combination);
        }
      });
    }

    return validSets;
  }

  var CombinationsVector = require('./combinations_vector');
  var combinationsVector = new CombinationsVector(self.cards.length, self.options.cardsInSet);

  combinationsVector.get(self.cards, function (combinations)
  {
    _.each(combinations, function (combination)
    {
      if (self._isValid(combination))
      {
        validSets.push(combination);
      }
    });
  });

  return validSets;
};

module.exports = Set;
