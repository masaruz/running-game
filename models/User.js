const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const Base = require('./Base')

class User extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.USERS
    super(data)
  }
}

module.exports = User
