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

  get (key) {
    return database.ref(this.getNodeName())
      .child(key)
      .once('value')
      .then(snapshot => {
        console.log(snapshot.val())
        return {
          data: snapshot.val()
        }
      })
  }

  update (key) {
    return database.ref(this.getNodeName())
      .child(key)
      .update(Object.assign(
        {},
        this.getAttributes(),
        { updated: new Date().getTime() }))
  }

  create () {
    const newRef = database.ref(this.getNodeName())
      .push(Object.assign(
        {},
        this.getAttributes(),
        { created: new Date().getTime() }
      ))
    return newRef.then(() => {
      return { id: newRef.key }
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
    for (let k in schema) {
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
