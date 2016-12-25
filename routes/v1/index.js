const path = require('path')
const express = require('express')
const router = express.Router()
const users = require('./users')
const pictures = require('./pictures')
const facebooks = require('./facebooks')
/* USER MANAGEMENT */
router.get('/users', users.all)
router.get('/users/:userId', users.get)
router.get('/auth/:userId', facebooks.get)
router.post('/users', users.create)
router.post('/users/:userId', users.update)

module.exports = router
