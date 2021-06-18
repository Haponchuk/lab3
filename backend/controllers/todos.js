const Todo = require('../models/Todo')

exports.find = (req, res) => {
    Todo.find().lean()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json({ message: error.message || 'Server error while retrieving todos' })
        })
}

exports.create = (req, res) => {
    const text = req.body.text
    if (!text || text.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid text todo' })
    }

    const todo = new Todo({ text })
    todo.save()
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((error) => {
            res.status(500).json({ message: error.message || 'Server error while creating todo' })
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    Todo.findByIdAndUpdate(id, {
        text: req.body.text,
        completed: req.body.completed,
    })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: `Not found todo with id ${id}` })
            } else {
                res.status(204).json(data)
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message || 'Server error while updating todo' })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Todo.findById(id).lean()
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: `Not found todo with id ${id}` })
            } else {
                res.status(200).json(data)
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `Error retrieving todo with id ${id}` })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Todo.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: `Not found todo with id ${id} for delete` })
            } else {
                res.status(204).json({ message: 'Todo successfully deleted!' })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message || `Server error while deleting todo with id ${id}` })
        })
}