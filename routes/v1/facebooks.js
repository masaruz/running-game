const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const User = require(path.join(__base, 'models', 'User'))

module.exports = {
  // get a user's data
  get (req, res, next) {
    const userId = req.params.userId
    new User()
      .findBySomeId('facebook', userId)
      // return promise object
      .then(result => new Promise((resolve, reject) => {
        // in case of account not found
        // this facebook never sync account before
        if (!result.data) 
          return reject(constant.ERROR.NOT_FOUND)
        resolve(result)
      }))
      .then(result => ({ 
        data: { 
          playerID: result.data.playerID 
        }
      }))
      .then(result => res.send(result))
      .catch(next)
  }
}
