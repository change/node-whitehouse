var should = require('should')
  , sinon = require('sinon')
  , wh = require('../lib/WhiteHouse')
  , whApi = wh.createWhiteHouse()

describe('getPetitions', function() {
  describe('when called with one argument (cb)', function() {
    it('should pass the callback to the api call function', function() {
      var stub = sinon.stub(whApi, 'apiCall')

      whApi.getPetitions('fakeCallback')
      stub.called.should.be.true

      whApi.apiCall.restore()
    })
  })
  describe('when called with two arguments (params, cb)', function() {
    it('should pass the arguments to the api call function', function() {
      var stub = sinon.stub(whApi, 'apiCall')

      whApi.getPetitions('fakeParams', 'fakeCallback')
      stub.called.should.be.true

      whApi.apiCall.restore()
    })
  })
  describe('when called with the wrong number of arguments', function() {
    it('should throw and error', function() {
      var stub = sinon.stub(whApi, 'apiCall')

      whApi.getPetitions.bind(null).should.throw()
      whApi.getPetitions.bind(null, 'fakeParams', 'fakeCallback', 'extraArg').should.throw()
      stub.called.should.be.false

      whApi.apiCall.restore()
    })
  })
})