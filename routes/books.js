const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController')
const { validateCreate, validateUpdate } = require('../validators/validationBook')

router.get('/', bookController.getBooks);
// #swagger.tags = ['Books']
// #swagger.summary = 'Obtener todos los libros'

router.get('/:id', bookController.getBookById);
// #swagger.tags = ['Books']
// #swagger.summary = 'Obtener un libro por ID'

router.post('/', validateCreate, bookController.createBook);
// #swagger.tags = ['Books']
// #swagger.summary = 'Crear un nuevo libro'
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Book' } }

router.put('/:id', validateUpdate, bookController.updateBook);
// #swagger.tags = ['Books']
// #swagger.summary = 'Actualizar un libro por ID'
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Book' } }

router.delete('/:id', bookController.deleteBook);
// #swagger.tags = ['Books']
// #swagger.summary = 'Eliminar un libro por ID'

module.exports = router;