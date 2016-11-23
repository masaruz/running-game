const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))
const database = require(path.join(__base, 'helpers', 'firebaseHelper')).database()

const Base = require('./Base')

class User extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.USERS
    super(data)
  }
  /**
   * used for query by any id
   * @param {String} method
   * @param {String} id
   * @return {Object}
   */
  findBySomeId (method, id) {
    let child
    switch (method) {
      case 'facebook':
        child = 'facebookId'
        break;
      default:
        child = 'playerID'
    }
    return database.ref(this.getNodeName())
      .orderByChild(child)
      .equalTo(id)
      .once('value')
      .then(snapshot => ({
        data: snapshot.val()
      }))
  }
}

module.exports = User
