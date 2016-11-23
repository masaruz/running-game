const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const Game2 = require(path.join(__base, 'models', 'Game2'))

module.exports = {
  // find game data which related with a user
  find (req, res, next) {
    new Game2()
      .findByUserId(req.params.userId)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // create game data
  create (req, res, next) {
    const game = new Game2(Object.assign(
      req.body,
      req.params
    ))
    game.create()
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // update game data
  update (req, res, next) {
    const game = new Game2(req.body)
    game.update(req.params.gameId)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
}
