var program = require('commander');

program
  .option('-c, --cardFile <path>, path to a card file') 
  .option('-s, --cardsInSet <number>, number of cards in a set, default is 3', parseInt)
  .option('-v, --useVectorGenerator, whether or not to use the vector combination generator')
  .parse(process.argv);

if (!program.cardFile)
{
  program.help();
  process.exit(-1);
}

var util = require('util');

var cards = require(program.cardFile);
var cardsInSet = program.cardsInSet || 3;
var useVectorGenerator = program.useVectorGenerator || false;

var Set = require('./lib/set');
var solver = new Set(cards, { cardsInSet: cardsInSet, useVectorGenerator: useVectorGenerator });

var validSets = solver.validSets();

console.log("Valid sets:");
console.log(validSets);
console.log(util.format("Number of valid sets: %s", validSets.length));
