const path = require('path')
const firebase = require('firebase/app')
require('firebase/database')
const credential = require(path.join(__base, 'tmp', 'firebaseCredential.json'))

firebase.initializeApp(credential)

module.exports = firebase
