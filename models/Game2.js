const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const GameBase = require('./GameBase')

class Game2 extends GameBase {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.GAME_1
    super(data)
  }
}

module.exports = Game2
