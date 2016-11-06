const path = require('path')
const database = require(path.join(__base, 'helpers', 'firebaseHelper'))

class Base {
  constructor (data) {
    this.tableName = data.tableName
    this.attributes = data.attributes
  }

  get (key, done) {
    database.ref(this.getTableName() + '/' + key)
      .once('value')
      .then(snapshot => {
        done(null, snapshot.val())
      })
  }

  update (key, done) {
    database.ref(this.getTableName() + '/' + key)
      .set(this.getAttributes())
      .then(data => {
        done(null, {
          userId: key
        })
      })
  }

  getAttributes () {
    return this.attributes
  }

  getTableName () {
    return this.tableName
  }
}

module.exports = Base
