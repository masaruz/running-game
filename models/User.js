const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))
const format = require(path.join(__base, 'helpers', 'formatHelper'))
const database = require(path.join(__base, 'helpers', 'firebaseHelper')).database()

const Base = require('./Base')

class User extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.USERS
    super(data)
  }

  findByUserId (playerID) {
    return database.ref(this.getNodeName())
      .orderByChild('playerID')
      .equalTo(playerID)
      .once('value')
      .then(snapshot => {
        return {
          data: format.removeJsonKey(snapshot.val())
        }
      })
  }
}

module.exports = User
