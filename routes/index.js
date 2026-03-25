const express = require('express');
const passport = require('passport');
const router = express.Router();

// #swagger.tags = ['General']
// #swagger.summary = 'Ruta de prueba'
router.get('/', (req, res) => {
    res.send("Hello World");
});

//libros
router.use('/books', require('./books'));

//Autores
router.use('/authors', require('./authors'));

// Swagger Docs
router.use('/api-docs', require('./swagger'));

module.exports = router;