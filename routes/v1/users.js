const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const User = require(path.join(__base, 'models', 'User'))
const Picture = require(path.join(__base, 'models', 'Picture'))

module.exports = {
  // list all users' data
  all (req, res, next) {
    const limit = req.query.limit
    const nextToken = req.query.nextToken
    new User()
      .scan(limit, nextToken)
      .then(result => res.send(result))
      .catch(next)
  },
  // get a user's data
  get (req, res, next) {
    const method = req.query.method
    const userId = req.params.userId
    new User()
      .findBySomeId(method, userId)
      .then(result => res.send(result))
      .catch(next)
  },
  // create a new user
  create (req, res, next) {
    const data = JSON.parse(req.body.data)
    new User(data)
      .update(data.playerID)
      .then(result => res.send(result))
      .catch(next)
  },
  // update a user's data
  update (req, res, next) {
    const method = req.query.method
    const userId = req.params.userId
    const data = JSON.parse(req.body.data)
    const user = new User(data)
    user.findBySomeId(method, userId)
      .then(result => result.data.playerID)
      .then(userId => user.update(userId))
      .then(result => res.send(result))
      .catch(next)
  },
  // upload profile picture
  upload (req, res, next) {
    const avatar = req.body.avatar // base64 string
    const playerID = req.params.userId
    new Picture({
      avatar
    }).update(playerID)
      .then(result => res.send(result))
      .catch(next)
  }
}
