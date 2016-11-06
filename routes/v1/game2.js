const path = require('path')
const async = require('async')
const constant = require(path.join(__base, 'helpers', 'constant'))

const Game2 = require(path.join(__base, 'models', 'Game2'))

module.exports = {
  // find game data which related with a user
  find (req, res, next) {
    async.waterfall([
      (done) => {
        new Game2().findByUserId(req.params.id, done)
      }
    ], (err, result) => {
      if (err) return next(err)
      res.send(result)
    })
  },
  // create game data
  create (req, res, next) {
    async.waterfall([
      (done) => {
        const game = new Game2(req.body)
        if (!game.validate(true))
          return done(constant.ERROR.INVALID_PARAM)
        game.create(req.params.id, done)
      }
    ], (err, result) => {
      if (err) return next(err)
      res.send(result)
    })
  },
  // update game data
  update (req, res, next) {
    async.waterfall([
      // validate
      (done) => {
        const game = new Game2(req.body)
        if (!game.validate())
          return done(constant.ERROR.INVALID_PARAM)
        game.update(req.params.id, done)
      }
    ], (err, result) => {
      if (err) return next(err)
      res.send(result)
    })
  }
}
