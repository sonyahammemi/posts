const express = require('express')

const postController = require('../controllers/Post')

const route = express.Router()

const checkAuth = require('../middlewares/auth')

route.put('/like/:id', checkAuth, postController.like)
route.put('/dislike/:id', checkAuth, postController.dislike)
route.get('/myposts', checkAuth , postController.getOwnPosts)
route.delete('/:id', checkAuth, postController.deletepost)
route.put('/:id', checkAuth, postController.updatePost)
route.get('/:id', checkAuth, postController.getById)
route.get('/', checkAuth, postController.getAll)
route.post('/', checkAuth , postController.create)

module.exports = route