var fs = require('fs'),
    wh = require('./lib/WhiteHouse');

var config = JSON.parse(fs.readFileSync('./config.json'));
var whApi = wh.createWhiteHouse(config.apiKey);
/*
whApi.getPetitions(100, function(output) {
  var obj = JSON.parse(output);
  console.log(obj);
});
*/
whApi.getPetition('51058ef7ee140f680500000f', function(output) {
  var obj = JSON.parse(output);
  console.log(obj);
});
