const path = require('path')
const database = require(path.join(__base, 'helpers', 'firebaseHelper'))

const SCHEMA = {
  created: { type: 'number' },
  updated: { type: 'number' }
}

class Base {
  constructor (data) {
    this.nodeName = data.nodeName
    this.attributes = data.attributes
    this.schema = Object.assign({}, SCHEMA, data.schema)
  }

  get (key, done) {
    database.ref(this.getNodeName())
      .child(key)
      .once('value', (snapshot) => {
        done(null, {
          data: snapshot.val()
        })
      })
  }

  update (key, done) {
    const attrs = this.getAttributes()
    attrs.updated = new Date().getTime()
    database.ref(this.getNodeName())
      .child(key)
      .update(attrs, () => {
        done(null, attrs)
      })
  }

  create (done) {
    const attrs = this.getAttributes()
    attrs.created = new Date().getTime()
    const newRef = database.ref(this.getNodeName())
      .push(attrs)
    done(null, {
      id: newRef.key
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
    for (var k in schema) {
      // not exist in schema
      if (!schema[k])
        return false
      // no required attribute when create
      if (!attrs[k] && isCreated && schema[k].required)
        return false
      // type is not equal
      if (attrs[k] && schema[k].type !== typeof attrs[k])
        return false
    }
    return true
  }

  getAttributes () {
    return this.attributes
  }

  getNodeName () {
    return this.nodeName
  }

  getSchema () {
    return this.schema
  }
}

module.exports = Base
