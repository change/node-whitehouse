var should = require('should')
  , sinon = require('sinon')
  , wh = require('../lib/WhiteHouse')
  , whApi = wh.createWhiteHouse()

describe('getPetitions', function() {
  var stub
  beforeEach(function() {
    stub = sinon.stub(whApi, 'apiCall')
  })
  afterEach(function() {
    whApi.apiCall.restore()
  })
  describe('when called with one argument (cb)', function() {
    it('should pass the callback to the api call function', function() {
      whApi.getPetitions('fakeCallback')
      stub.called.should.be.true
    })
  })
  describe('when called with two arguments (params, cb)', function() {
    it('should pass the arguments to the api call function', function() {
      whApi.getPetitions('fakeParams', 'fakeCallback')
      stub.called.should.be.true
    })
  })
  describe('when called with the wrong number of arguments', function() {
    it('should throw and error', function() {
      whApi.getPetitions.bind(null).should.throw()
      whApi.getPetitions.bind(null, 'fakeParams', 'fakeCallback', 'extraArg').should.throw()
      stub.called.should.be.false
    })
  })
})

describe('getSignatures', function() {
  describe('when called with two arguments (petition, cb)', function() {
    it('should pass the arguments to the api call function', function() {
      var stub = sinon.stub(whApi, 'apiCall')

      whApi.getSignatures('fakePetition', 'fakeCallback')
      stub.called.should.be.true

      whApi.apiCall.restore()
    })
  })
  describe('when called with three arguments (petition, params, cb)', function() {
    it('should pass the arguments to the api call function', function() {
      var stub = sinon.stub(whApi, 'apiCall')

      whApi.getSignatures('fakePetition', 'fakeParams', 'fakeCallback')
      stub.called.should.be.true

      whApi.apiCall.restore()
    })
  })
  describe('when called with the right number of arguments', function() {
    it('should throw an error', function() {
      var stub = sinon.stub(whApi, 'apiCall')

      whApi.getSignatures.bind(null).should.throw()
      whApi.getSignatures.bind(null, 'fakePetition', 'fakeParams', 'fakeCallback', 'extraArg').should.throw()

      whApi.apiCall.restore()
    })
  })
})
