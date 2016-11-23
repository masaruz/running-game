const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))
const database = require(path.join(__base, 'helpers', 'firebaseHelper')).database()

const Base = require('./Base')

class Picture extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.PICTURES
    super(data)
  }
}

module.exports = Picture
