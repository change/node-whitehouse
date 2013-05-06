var fs = require('fs'),
    wh = require('../lib/WhiteHouse'),
    whApi = wh.createWhiteHouse()

whApi.getPetitions(function(output) {
  var obj = JSON.parse(output)
  console.log(obj)
})

//Filter by create_after with a UNIX timestamp
whApi.getPetitions({'created_after':Math.floor(new Date().getTime()/1000)}, function(output) {
  var obj = JSON.parse(output)
  console.log(obj)
})

whApi.getPetition('51058ef7ee140f680500000f', function(output) {
  var obj = JSON.parse(output)
  console.log(obj)
})

whApi.getSignatures('51058ef7ee140f680500000f', function(output) {
  var obj = JSON.parse(output)
  console.log(obj)
})
