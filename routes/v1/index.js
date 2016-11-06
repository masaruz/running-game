const path = require('path')
const express = require('express')
const router = express.Router()
const users = require('./users')
const game1 = require('./game1')

/* USER MANAGEMENT */
router.get('/users/:id', users.get)
router.post('/users', users.create)
router.post('/users/:id', users.update)
/* GAME1 MANAGEMENT */
router.get('/users/:id/game1', game1.find)
router.post('/users/:id/game1', game1.create)
router.post('/users/:id/game1/:id', game1.update)

module.exports = router
