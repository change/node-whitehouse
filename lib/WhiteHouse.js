var https = require('https'),
    fs = require('fs'),
    events = require('events'),
    util = require('util'),
    querystring = require('querystring');

var WhiteHouse = function(apiKey, mock) {
  events.EventEmitter.call(this);
  this.apiKey = apiKey;
  this.baseUrl = 'https://petitions.whitehouse.gov/api/v1/';
  if(mock) {
    this.mock = true; // TODO enable this as a switch or a constructor
  }
};
util.inherits(WhiteHouse, events.EventEmitter);

WhiteHouse.prototype.getPetitions = function() {
  var args = Array.prototype.slice.apply(arguments);
  var params = {},
      cb;
  if (args.length === 1) { cb = args[0];} //assume cb only
  else if (args.length === 2) { params.limit = args[0]; cb = args[1];} //assume limit cb only
  else if (args.length === 3) { params.offset = params.args[0]; params.limit = args[1]; cb = args[2];} //assume offset limit cb

  var url = 'petitions.json';  

  this.apiCall(url, params, cb);
};

WhiteHouse.prototype.getPetition = function(id, cb) {
  var url = '/petitions/' + id + '.json?';
  this.apiCall(url, {}, cb);
}

WhiteHouse.prototype.apiCall = function(url, params, cb) {
  url = this.baseUrl + url;
  if (this.mock) { params.mock = 1; }
  params.key = this.apiKey; 

  url = url + querystring.stringify(params);

  console.log(url);

  https.get(url, function(res) {
    var output = "";
    res.on('data', function(d) {
      output += d;
    });
    res.on('end', function() {
      cb(output);
    });
  });
};

exports.WhiteHouse = WhiteHouse;
exports.createWhiteHouse = function(apiKey) {
  return new WhiteHouse(apiKey);
};

/*
* TODOS
*
* Use QS module to build QSs properly
*/
