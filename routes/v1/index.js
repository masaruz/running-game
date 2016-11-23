const path = require('path')
const express = require('express')
const router = express.Router()
const users = require('./users')
/* USER MANAGEMENT */
router.get('/users/:userId', users.get)
router.post('/users', users.create)
router.post('/users/:userId', users.update)
router.post('/users/:userId/upload', users.upload)

module.exports = router
