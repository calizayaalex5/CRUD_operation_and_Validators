const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController')
const { validateCreate, validateUpdate } = require('../validators/validationBook')
const { isAuthenticate } = require('../middleware/authenticate')

// #swagger.tags = ['Books']
// #swagger.summary = 'Obtener todos los libros'
router.get('/', bookController.getBooks);

// #swagger.tags = ['Books']
// #swagger.summary = 'Obtener un libro por ID'
router.get('/:id', bookController.getBookById);

// #swagger.tags = ['Books']
// #swagger.summary = 'Crear un nuevo libro'
// #swagger.security = [{ "BearerAuth": [] }]
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Book' } }
router.post('/', isAuthenticate, validateCreate, bookController.createBook);

// #swagger.tags = ['Books']
// #swagger.summary = 'Actualizar un libro por ID'
// #swagger.security = [{ "BearerAuth": [] }]
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Book' } }
router.put('/:id', isAuthenticate, validateUpdate, bookController.updateBook);

// #swagger.tags = ['Books']
// #swagger.security = [{ "BearerAuth": [] }]
// #swagger.summary = 'Eliminar un libro por ID'
router.delete('/:id', isAuthenticate, bookController.deleteBook);


module.exports = router;