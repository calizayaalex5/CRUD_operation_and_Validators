const { ObjectId } = require('mongodb')
const Author = require('../models/authors')

const getAuthors = async (req, res) => {
    try {
        const result = await Author.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAuthorById = async (req, res) => {
    try {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Formato de ID inválido" })
        }

        const result = await Author.findById(id)

        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: "ID no encontrado" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createAuthor = async (req, res) => {
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        birthDate: req.body.birthDate,
        bio: req.body.bio,
        genre: req.body.genre,
        activeYears: req.body.activeYears,
        website: req.body.website
    })

    try {
        const saveAuthor = await author.save()
        res.status(201).json(saveAuthor)
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    }
}

const updateAuthor = async (req, res) => {
    try {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Formato de ID inválido" })
        }

        const author = await Author.updateOne(
            { _id: id },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nationality: req.body.nationality,
                    birthDate: req.body.birthDate,
                    bio: req.body.bio,
                    genre: req.body.genre,
                    activeYears: req.body.activeYears,
                    website: req.body.website
                }
            }
        )

        if (author.matchedCount === 0) {
            return res.status(404).json({ message: "ID no encontrado" })
        }
        res.status(200).json({ message: "Autor actualizado con éxito", author })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Formato de ID inválido" })
        }

        const result = await Author.findByIdAndDelete(id)

        if (result) {
            res.status(200).json({ message: "Autor borrado con éxito" })
        } else {
            res.status(404).json({ message: "ID no encontrado" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}