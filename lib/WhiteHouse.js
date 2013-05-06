var https = require('https'),
    fs = require('fs'),
    events = require('events'),
    util = require('util'),
    querystring = require('querystring')

var WhiteHouse = function(apiKey, mock) {
  events.EventEmitter.call(this)
  this.apiKey = (apiKey) ? apiKey : ''
  this.baseUrl = 'https://api.whitehouse.gov/v1/'
  this.mock = (mock) ? true : false
}
util.inherits(WhiteHouse, events.EventEmitter)

WhiteHouse.prototype.getPetition = function(id, cb) {
  var url = 'petitions/' + id + '.json'
  this.apiCall(url, {}, cb)
}

WhiteHouse.prototype.getPetitions = function() {
  var args = Array.prototype.slice.apply(arguments),
      params = {},
      cb

  if (args.length === 1) { 
    //assume cb only
    cb = args[0]
  }
  else if (args.length === 2) { 
    //assume config obj and cb
    params = args[0]
    cb = args[1]
  }
  else { 
    throw new Error("Takes callback or options and callback") 
  }

  var url = 'petitions.json'
  this.apiCall(url, params, cb)
}

WhiteHouse.prototype.getSignatures = function() {
  var args = Array.prototype.slice.apply(arguments),
      params = {},
      cb,
      petition

  if (args.length === 2) { 
    //assume petition id and cb only
    petition = args[0]
    cb = args[1]
  }
  else if (args.length === 3) { 
    //assume petition id, config obj and cb
    petition = args[0]
    params = args[1]
    cb = args[2]
  }
  else { 
    throw new Error("Takes petition id and callback or petition id, options and callback") 
  }

  var url = 'petitions/' + petition + '/signatures.json'
  this.apiCall(url, params, cb)
}

//Meta function to make calls easy
WhiteHouse.prototype.apiCall = function(url, params, cb) {
  url = this.baseUrl + url + '?'
  if (this.mock) { params.mock = 1 }
  params.key = this.apiKey 

  url = url + querystring.stringify(params)

  https.get(url, function(res) {
    var output = ""
    res.on('data', function(d) {
      output += d
    })
    res.on('end', function() {
      cb(output)
    })
  })
}

exports.WhiteHouse = WhiteHouse
exports.createWhiteHouse = function(apiKey) {
  return new WhiteHouse(apiKey)
}
