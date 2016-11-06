const path = require('path')
const database = require(path.join(__base, 'helpers', 'firebaseHelper'))
const modelHelper = require(path.join(__base, 'helpers', 'modelHelper'))
const constant = require(path.join(__base, 'helpers', 'constant'))

const Base = require('./Base')

const SCHEMA = {
  location1: { type: 'string', required: true },
  location2: { type: 'string', required: true },
  duration: { type: 'number', required: true },
  combo: { type: 'number' }
}

class Game1 extends Base {
  constructor (attributes = {}) {
    let data = {}
    data.attributes = attributes
    data.nodeName = constant.NODE.GAME_1
    data.schema = SCHEMA
    super(data)
  }

  create (userId, done) {
    const attrs = this.getAttributes()
    attrs.created = new Date().getTime()
    const newRef = database.ref(this.getNodeName())
      .child(userId)
      .push(attrs)
    done(null, {
      id: newRef.key
    })
  }

  findByUserId (key, done) {
    database.ref(this.getNodeName())
      .child(key)
      .orderByChild('created')
      .limitToLast(5)
      .once('value', (snapshot) => {
        const val = snapshot.val()
        done(null, {
          data: Object.keys(val).map(k => {
            const obj = val[k]
            obj.id = k
            return obj
          }).reverse()
        })
      })
  }
}

module.exports = Game1
