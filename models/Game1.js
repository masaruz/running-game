const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const GameBase = require('./GameBase')

const SCHEMA = {
  location1: { type: 'string', required: true },
  location2: { type: 'string', required: true }
}

class Game1 extends GameBase {
  constructor (attributes = {}) {
    const data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.GAME_1
    data.schema = SCHEMA
    super(data)
  }
}

module.exports = Game1
