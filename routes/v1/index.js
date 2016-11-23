const path = require('path')
const express = require('express')
const router = express.Router()
const users = require('./users')
const game1 = require('./game1')
const game2 = require('./game2')
/* USER MANAGEMENT */
router.get('/users/:userId', users.get)
router.post('/users', users.create)
router.post('/users/:userId', users.update)
router.post('/users/:userId/upload', users.upload)
/* GAME MANAGEMENT */
// router.get('/users/:userId/game1', game1.find)
// router.post('/users/:userId/game1', game1.create)
// router.post('/game1/:gameId', game1.update)
// router.get('/users/:userId/game2', game2.find)
// router.post('/users/:userId/game2', game2.create)
// router.post('/game2/:gameId', game2.update)

module.exports = router
