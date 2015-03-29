/*jshint -W083 */

var _ = require('lodash');
var BitArray = require('node-bitarray');
var util = require('util');

function CombinationsBit (n, k)
{
  if (n > 31)
  {
    console.error(util.format("CombinationsBit doesn't work for n greater than 31. n was provided as %d", n));
    throw new RangeError();
  }

  this.n = n;
  this.k = k;

  this.i = 0;
  this.nBits = Math.abs(1 << this.n);
}

CombinationsBit.prototype.hasMore = function ()
{
  return this.i < this.nBits;
};

CombinationsBit.prototype.next = function (array, callback)
{
  var self = this;

  if (self.i >= self.nBits)
  {
    return callback(null);
  }

  for (; self.i < self.nBits; ++self.i)
  {
    if (BitArray.bitcount(self.i) == self.k)
    {
      var result = [ ];

      var bits = BitArray.parse(self.i, true).reverse();

      _.each(bits, function (bit, index)
      {
        if ((bit === 1) && (index < array.length))
        {
          result.push(array[index]);
        }
      });

      self.i += 1;
      return callback(result);
    }
  }
};

module.exports = CombinationsBit;
