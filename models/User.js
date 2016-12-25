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
   * paging users data
   * @param {number} limit
   * @param {string} startAt
   */
  scan (limit = 100, startAt = '') {
    return database.ref(this.getNodeName())
      .orderByKey()
      .limitToFirst(limit + 1)
      .startAt(startAt)
      .once('value')
      .then(snapshot => 
        jsonHelper.getJsonValue(snapshot.val()))
      .then(snapshot => {
        let last = snapshot.pop()
        let result = {}
        result.data = snapshot
        if (last.playerID) 
          result.nextToken = last.playerID
        return result
      })
  }
  /**
   * used for query by any id
   * @param {string} method
   * @param {string} id
   * @return {object}
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
