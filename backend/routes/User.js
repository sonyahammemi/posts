const express = require('express')

const userController = require('../controllers/User')
const route = express.Router()
const checkAuth = require('../middlewares/auth')
const upload = require('../middlewares/ulpoad')

route.put('/avatar', checkAuth, upload.single('avatar'), userController.uploadAvatar)
route.post('/', userController.register)
route.post('/login', userController.login)
route.get('/isauth', checkAuth, userController.isAuthenticated)
route.get('/logout', checkAuth, userController.logout)
route.get('/me', checkAuth, userController.getMe)
route.put('/', checkAuth, userController.update)

module.exports = route