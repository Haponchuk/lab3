const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/todos')

router.get('/', TodoController.find)
router.get('/:id', TodoController.findOne)
router.put('/:id', TodoController.update)
router.post('/', TodoController.create)
router.delete('/:id', TodoController.delete)

module.exports = router