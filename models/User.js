const path = require('path')
const userHelper = require(path.join(__base, 'helpers', 'userHelper'))
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
    data.tableName = constant.TABLE_NAME.USERS
    data.schema = SCHEMA
    super(data)
  }

  create (done) {
    super.create(userHelper.uuid(), done)
  }
}

module.exports = User
