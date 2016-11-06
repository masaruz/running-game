const path = require('path')
const async = require('async')
const constant = require(path.join(__base, 'helpers', 'constant'))

const User = require(path.join(__base, 'models', 'User'))

module.exports = {
  // get a user's data
  get (req, res, next) {
    async.waterfall([
      (done) => {
        new User().get(req.params.id, done)
      }
    ], (err, result) => {
      if (err) return next(err)
      res.send(result)
    })
  },
  create (req, res, next) {
    async.waterfall([
      (done) => {
        const data = req.body
        const user = new User(data)
        if (!user.validate(true))
          return done(constant.ERROR.INVALID_PARAM)
        user.create(done)
      }
    ], (err, result) => {
      if (err) return next(err)
      res.send(result)
    })
  },
  // update a user's data
  update (req, res, next) {
    async.waterfall([
      // validate
      (done) => {
        const id = req.params.id
        const data = req.body
        const user = new User(data)
        if (!user.validate())
          return done(constant.ERROR.INVALID_PARAM)
        user.update(id, done)
      }
    ], (err, result) => {
      if (err) return next(err)
      res.send(result)
    })
  }
}
