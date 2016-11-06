global.__base = 'D:\\Programming\\running-game\\'
const path = require('path')
const assert = require('assert')
const User = require(path.join(__base, 'models', 'User'))

describe('Validation', function() {
  describe('#user create', function() {
    it('check with all required params', function() {
      assert.equal(new User({
      	"firstname": "stamp",
      	"lastname": "masaruz",
      	"email": "stamp@sinoze.com"
      }).validate(true), true)
    })

    it('check with missing 1 required param', function() {
      assert.equal(new User({
      	"firstname": "stamp",
      	"lastname": "masaruz"
      }).validate(true), false)
    })
  })
  describe('#user update', function() {
    it('check with all required params', function() {
      assert.equal(new User({
        "firstname": "stamp",
        "lastname": "masaruz",
        "email": "stamp@sinoze.com"
      }).validate(), true)
    })

    it('check with missing 1 required param', function() {
      assert.equal(new User({
        "firstname": "stamp",
        "lastname": "masaruz"
      }).validate(), true)
    })
  })
})
