# White House API Module for Node.js

## Overview

Currently this module only supports the we the people APIs. However we'll add support for other parts of the WH APIs over time. Pull requests welcome

## Installation

Easy installation with NPM

```bash
npm install whitehouse
```

## License

This project is licensed under the BSD license 

## Usage

Simply include the `whitehouse` module and then create a new API object you can then call methods to make requests. 

```javascript
var wh = require('whitehouse'),
    whApi = wh.createWhiteHouse()

whApi.getPetitions(function(output) {
  var obj = JSON.parse(output)
  console.log(obj)
})
```

Exact details of available filters are on the [We The People documentation](https://petitions.whitehouse.gov/developers).

=== getPetitions(fn)

Get all petitions call `fn` with the data.

=== getPetitions(filter, fn)

Get all petitions that match the `filter` object, call `fn` with the data.

=== getPetition(id, fn)

Get petition matching `id` call `fn` with the data.

=== getSignatures(id, fn)

Get signatures matching petition `id` call `fn` with the data.

=== getSignatures(id, filter, fn)

Get signatures matching petition `id` and `filter` call `fn` with the data.


## Examples

```javascript
var wh = require('whitehouse'),
    whApi = wh.createWhiteHouse()

whApi.getPetitions(function(output) {
  var obj = JSON.parse(output)
  console.log(obj)
})

whApi.getPetitions(function(output) {
  var obj = JSON.parse(output)
  console.log(obj)
})
```

## Todo

1. Add in actual tests
2. Better JSON support
3. Better streaming suport
4. Improved documentation
5. Improved error handling
6. Support for node.js domains

## Legacy

When creating API objects the setting of an API Key is still supported from an earlier version of the API.

```javascript
whApi = wh.createWhiteHouse(apiKey)
```

You can also pass a second parameter to the contructor to set the `mock` value. This was originally used to get mock requests for testing.

```javascript
whApi = wh.createWhiteHouse(apiKey,true) //use mock requests
```
