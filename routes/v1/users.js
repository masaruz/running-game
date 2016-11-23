const path = require('path')
const multer  = require('multer')
const constant = require(path.join(__base, 'helpers', 'constant'))

const User = require(path.join(__base, 'models', 'User'))

module.exports = {
  // get a user's data
  get (req, res, next) {
    new User().get(req.params.userId)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // create a new user
  create (req, res, next) {
    const user = new User(req.body)
    user.create()
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // update a user's data
  update (req, res, next) {
    const user = new User(req.body)
    user.update(req.params.userId)
      .then(result => {
        res.send(result)
      })
      .catch(next)
  },
  // upload profile picture
  upload: [
    multer({
      storage: multer.diskStorage({
        destination: (req, file, done) => {
          done(null, 'uploads')
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
