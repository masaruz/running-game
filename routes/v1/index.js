const path = require('path')
const express = require('express')
const router = express.Router()
const users = require('./users')

/* USER MANAGEMENT */
router.get('/users/:id', users.get)
router.post('/users', users.create)
router.post('/users/:id', users.update)

module.exports = router
