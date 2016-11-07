const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const Game1 = require(path.join(__base, 'models', 'Game1'))

module.exports = {
  // find game data which related with a user
  find (req, res, next) {
    new Game1()
      .findByUserId(req.params.userId)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // create game data
  create (req, res, next) {
    const game = new Game1(Object.assign(
      req.body,
      req.params
    ))
    if (!game.validate(true))
      return next(constant.ERROR.INVALID_PARAM)
    game.create()
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // update game data
  update (req, res, next) {
    const game = new Game1(req.body)
    if (!game.validate())
      return done(constant.ERROR.INVALID_PARAM)
    game.update(req.params.gameId)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
}
