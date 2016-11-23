const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))
const database = require(path.join(__base, 'helpers', 'firebaseHelper')).database()
const jsonHelper = require(path.join(__base, 'helpers', 'jsonHelper'))

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
        return database.ref(this.getNodeName())
          .orderByChild('facebookId')
          .equalTo(id)
          .once('value')
          .then(snapshot =>
            jsonHelper.getJsonValue(snapshot.val()))
          .then(result => ({
            data: result
          }))
        break;
      default:
        return super.get(id)
    }
  }
}

module.exports = User
