const path = require('path')
const express = require('express')
const router = express.Router()
const users = require('./users')
const pictures = require('./pictures')
/* USER MANAGEMENT */
router.get('/users/:userId', users.get)
router.post('/users', users.create)
router.post('/users/:userId', users.update)
router.post('/users/:userId/upload', users.upload)
/* PICTURE MANAGEMENT */
router.get('/pictures/:userId', pictures.get)

module.exports = router
