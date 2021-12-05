const express = require('express')

const CommentController = require('../controllers/Comment')

const route = express.Router()

const checkAuth = require('../middlewares/auth')

route.post('/', checkAuth, CommentController.create)

module.exports = route