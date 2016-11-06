const path = require('path')
const database = require(path.join(__base, 'helpers', 'firebaseHelper'))

const SCHEMA = {
  created: { type: 'number' },
  updated: { type: 'number' }
}

class Base {
  constructor (data) {
    this.tableName = data.tableName
    this.attributes = data.attributes
    this.schema = Object.assign({}, SCHEMA, data.schema)
  }

  get (key, done) {
    database.ref(this.getTableName())
      .child(key)
      .once('value')
      .then(snapshot => {
        done(null, snapshot.val())
      })
  }

  update (key, done) {
    database.ref(this.getTableName())
      .child(key)
      .update(this.getAttributes())
      .then(data => {
        done(null, {
          userId: key
        })
      })
  }

  create (key, done) {
    database.ref(this.getTableName())
      .child(key)
      .set(this.getAttributes())
      .then(data => {
        done(null, {
          userId: key
        })
      })
  }
  // validate attributes
  validate (isCreated = false) {
    const attrs = this.getAttributes()
    // if no attributes
    if (Object.keys(attrs).length <= 0)
      return false
    const schema = this.getSchema()
    // validate type and required
    for (var k in attrs) {
      // not exist in schema
      if (!schema[k])
        return false
      // no required attribute when create
      if (isCreated && schema[k].required && !attrs[k])
        return false
      // type is not equal
      else if (schema[k].type !== typeof attrs[k])
        return false
    }
    return true
  }

  getAttributes () {
    return this.attributes
  }

  getTableName () {
    return this.tableName
  }

  getSchema () {
    return this.schema
  }
}

module.exports = Base
