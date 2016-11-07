const path = require('path')
const async = require('async')
const constant = require(path.join(__base, 'helpers', 'constant'))

const User = require(path.join(__base, 'models', 'User'))

module.exports = {
  // get a user's data
  get (req, res, next) {
    new User().get(req.params.id)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // create a new user
  create (req, res, next) {
    const user = new User(req.body)
    if (!user.validate(true))
      return next(constant.ERROR.INVALID_PARAM)
    user.create()
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // update a user's data
  update (req, res, next) {
    const user = new User(req.body)
    if (!user.validate())
      return next(constant.ERROR.INVALID_PARAM)
    user.update(req.params.id)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
}
