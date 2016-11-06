const path = require('path')
const userHelper = require(path.join(__base, 'helpers', 'userHelper'))
const constant = require(path.join(__base, 'helpers', 'constant'))

const Base = require('./Base')

class User extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.tableName = constant.TABLE_NAME.USERS
    super(data)
  }

  create (done) {
    super.update(userHelper.uuid(), done)
  }

  update (key) {
    // do something to update attributes
  }
}

module.exports = User
