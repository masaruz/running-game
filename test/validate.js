global.__base = 'D:\\Programming\\running-game\\'
const path = require('path')
const assert = require('assert')
const User = require(path.join(__base, 'models', 'User'))
const Game1 = require(path.join(__base, 'models', 'Game1'))

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
  describe('#game1 update', function() {
    it('check with all required params', function() {
      assert.equal(new Game1({
      	"location1": 1,
      	"location2": 2,
      	"duration": 10,
      	"combo": 10,
      	"userId": "c48fa450-3edb-4174-a02b-3a3901fd4544"
      }).validate(true), true)
    })
  })
})
