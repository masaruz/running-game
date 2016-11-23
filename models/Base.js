const path = require('path')
const database = require(path.join(__base, 'helpers', 'firebaseHelper')).database()

class Base {
  constructor (data) {
    this.nodeName = data.nodeName
    this.attributes = data.attributes
  }

  get (key) {
    return database.ref(this.getNodeName())
      .child(key)
      .once('value')
      .then(snapshot => ({ data: snapshot.val() }))
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
    return newRef.then(() => ({ id: newRef.key }))
  }

  getAttributes () {
    return this.attributes
  }

  getNodeName () {
    return this.nodeName
  }
}

module.exports = Base
