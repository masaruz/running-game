const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const GameBase = require('./GameBase')

const SCHEMA = {
  location: { type: 'string', required: true }
}

class Game2 extends GameBase {
  constructor (attributes = {}) {
    const data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.GAME_1
    data.schema = SCHEMA
    super(data)
  }
}

module.exports = Game2
