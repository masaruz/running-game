const path = require('path')
const multer  = require('multer')
const jsonHelper = require(path.join(__base, 'helpers', 'jsonHelper'))
const constant = require(path.join(__base, 'helpers', 'constant'))

const User = require(path.join(__base, 'models', 'User'))

module.exports = {
  // get a user's data
  get (req, res, next) {
    const method = req.query.method
    const userId = req.params.userId
    new User().findBySomeId(method, userId)
      .then(result => ({
        data: jsonHelper.removeJsonKey(result.data)
      }))
      .then(result => res.send(result))
      .catch(next)
  },
  // create a new user
  create (req, res, next) {
    new User(req.body).create()
      .then(result => res.send(result))
      .catch(next)
  },
  // update a user's data
  update (req, res, next) {
    const method = req.query.method
    const userId = req.params.userId
    const user = new User(req.body)
    user.findBySomeId(method, userId)
      .then(result => jsonHelper.getJsonKey(result.data))
      .then(userId => user.update(userId))
      .then(result => res.send(result))
      .catch(next)
  },
  // upload profile picture
  upload: [
    multer({
      storage: multer.diskStorage({
        destination: (req, file, done) => {
          done(null, 'public/images')
        },
        filename: (req, file, done) => {
          done(null, req.params.userId + path.extname(file.originalname))
        }
      })
    }).single('avatar'),
    (req, res, next) => {
      res.send(req.file)
    }
  ]
}
