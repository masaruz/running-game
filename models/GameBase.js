const path = require('path')
const database = require(path.join(__base, 'helpers', 'firebaseHelper')).database()
const constant = require(path.join(__base, 'helpers', 'constant'))

const Base = require('./Base')

class GameBase extends Base {
  constructor (data) {
    super(data)
  }

  findByUserId (userId) {
    return database.ref(this.getNodeName())
      .orderByChild('userId')
      .equalTo(userId)
      .limitToLast(5)
      .once('value')
      .then(snapshot => {
        const val = snapshot.val()
        return {
          data: Object.keys(val || {})
            .map(k => {
              const obj = val[k]
              obj.id = k
              return obj
            }).reverse()
        }
      })
  }
}

module.exports = GameBase
