const path = require('path')
const database = require(path.join(__base, 'helpers', 'firebaseHelper'))
const modelHelper = require(path.join(__base, 'helpers', 'modelHelper'))
const constant = require(path.join(__base, 'helpers', 'constant'))

const Base = require('./Base')

const SCHEMA = {
  userId: { type: 'string', required: true },
  location1: { type: 'number' },
  location2: { type: 'number' },
  duration: { type: 'number', required: true },
  combo: { type: 'number' }
}

class Game1 extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.tableName = constant.TABLE_NAME.GAME_1
    data.schema = SCHEMA
    super(data)
  }

  create (done) {
    super.create(modelHelper.uuid(), done)
  }

  findByUserId (key, done) {
    database.ref(this.getTableName())
      .orderByChild('userId')
      .equalTo(key)
      .once('value', (snapshot) => {
        const val = snapshot.val()
        done(null, {
          data: Object.keys(val).map(k => {
            const obj = val[k]
            obj.id = k
            return obj
          })
        })
      })
  }
}

module.exports = Game1
