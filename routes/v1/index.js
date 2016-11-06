const path = require('path')
const express = require('express')
const router = express.Router()
const users = require('./users')
const game1 = require('./game1')
const game2 = require('./game2')

/* USER MANAGEMENT */
router.get('/users/:id', users.get)
router.post('/users', users.create)
router.post('/users/:id', users.update)
/* GAME MANAGEMENT */
router.get('/users/:id/game1', game1.find)
router.post('/users/:id/game1', game1.create)
router.post('/users/:id/game1/:id', game1.update)
router.get('/users/:id/game2', game2.find)
router.post('/users/:id/game2', game2.create)
router.post('/users/:id/game2/:id', game2.update)

module.exports = router
