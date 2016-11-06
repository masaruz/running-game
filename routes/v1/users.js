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
        if (!(data.firstname &&
          data.lastname &&
          data.email &&
          data.imgUrl &&
          data.facebookId))
          return done(constant.ERROR.MISSING_PARAM)
        done(null, data)
      },
      (data, done) => {
        new User({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          profilePicture: data.imgUrl,
          facebookId: data.facebookId
        }).create(done)
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
        const body = req.body
      }
    ], (err, result) => {
      if (err) return next(err)
      res.send(result)
    })
  }
}
