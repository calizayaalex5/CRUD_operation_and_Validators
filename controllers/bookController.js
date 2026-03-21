const { ObjectId } = require('mongodb')
const Book = require('../models/books')

const getBooks = async (req, res) => {
    try {
        const result = await Book.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getBookById = async (req, res) => {
    try {
        const id = req.params.id
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Formato de ID inválido" })
        }

        const result = await Book.findById(id)

        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: "ID no encontrado" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        pages: req.body.pages,
        genre: req.body.genre,
        publishedDate: req.body.publishedDate,
        lenguage: req.body.lenguage
    });

    try {
        const saveBook = await book.save()
        res.status(201).json(saveBook);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateBook = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Formato de ID inválido" })
        }

        const book = await Book.updateOne(
            { _id: id },
            { 
                $set: {
                    title: req.body.title ,
                    description: req.body.description,
                    author: req.body.author,
                    pages: req.body.pages,
                    genre: req.body.genre,
                    publishedDate: req.body.publishedDate,
                    lenguage: req.body.lenguage
                }
            }
        )

        if (book.matchedCount === 0) {
            return res.status(404).json({ message: "Id no encontrado" })
        }
        res.status(200).json({ message: "Libro actualizado con exito", book })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Formato de ID inválido" })
        }

        const result = await Book.findByIdAndDelete(id)

        if (result) {
            res.status(200).json({ message: "Libro borrado con exito" })
        } else {
            res.status(404).json({ message: "Id no encontrado :("})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}