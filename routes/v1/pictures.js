const path = require('path')
const multer  = require('multer')
const jsonHelper = require(path.join(__base, 'helpers', 'jsonHelper'))
const constant = require(path.join(__base, 'helpers', 'constant'))

const Picture = require(path.join(__base, 'models', 'Picture'))

module.exports = {
  // get a user's data
  get (req, res, next) {
    const userId = req.params.userId
    new Picture().get(userId)
      .then(result => res.send(result))
      .catch(next)
  }
}
