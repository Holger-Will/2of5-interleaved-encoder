var assert = require('chai').assert
var should = require('chai').should()
var Encoder = new require("../")
describe('2of5-interleaved-encoder', function() {
  it('should encode Strings', function () {
    var encoder = new Encoder()
    var res = encoder.encode("1234")
    assert.equal(res,":1234;")
  })
  it('should prepend a zero to uneven numbers', function () {
    var encoder = new Encoder()
    var res = encoder.encode("12340")
    assert.equal(res,":012340;")
  })
  it('should support output="bars"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("00",{output:"bars"})
    assert.equal(res,"1010101011001100101101")
  })
  it('should support output="weights"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("00",{output:"weights"})
    assert.equal(res,"11111111222211211")
  })
  it('should support output="codes"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("00",{output:"codes"})
    assert.equal(res[1],0)
    assert.equal(res[0],100)
    assert.equal(res[2],101)
  })
  it('should support output="array"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("00",{output:"array"})
    assert.equal(res[1],"00")
    assert.equal(res[0],":")
    assert.equal(res[2],";")
  })
  it('should support output="all"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("01",{output:"all"})
    assert.equal(res[1].symbol,"01")
    assert.equal(res[0].bars,"1010")
    assert.equal(res[2].weights,"211")
  })
});
