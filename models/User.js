const path = require('path')
const constant = require(path.join(__base, 'helpers', 'constant'))

const Base = require('./Base')

const SCHEMA = {
  firstname: { type: 'string', required: true },
  lastname: { type: 'string', required: true },
  email: { type: 'string', required: true },
  imgUrl: { type: 'string' },
  facebookId: { type: 'string' }
}

class User extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.USERS
    data.schema = SCHEMA
    super(data)
  }
}

module.exports = User
