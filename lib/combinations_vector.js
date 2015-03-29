var _ = require('lodash');
var BitArray = require('node-bitarray');
var util = require('util');

// Based on http://www.cs.utexas.edu/users/djimenez/utsa/cs3343/lecture25.html

function CombinationsVector (n, k)
{
  this.n = n;
  this.k = k;

  this.vector = [];
}

CombinationsVector.prototype.get = function (array, callback)
{
  var self = this;
  var results = [ ];

  var impl = function (vectorStart, currentK)
  {
    var i = 0;

    if (currentK >= self.k)
    {
      var result = [ ];
      for (i = 0; i < self.k; i++)
      {
        result.push(self.vector[i]);
      }
      
      results.push(result);

      return;
    }

    for (i = vectorStart; i < self.n; ++i)
    {
      self.vector[currentK] = i;

      impl(i + 1, currentK + 1);
    }
  };

  impl(0, 0);

  callback(_.map(results, function (result)
  {
    return _.map(result, function (index)
    {
      return array[index];
    });
  }));
};

module.exports = CombinationsVector;
