const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController')
const { validateCreateAuthor, validateUpdateAuthor } = require('../validators/validationAuthor')
const { isAuthenticate } = require('../middleware/authenticate')

// #swagger.tags = ['Authors']
// #swagger.summary = 'Obtener todos los autores'
router.get('/', authorController.getAuthors);

// #swagger.tags = ['Authors']
// #swagger.summary = 'Obtener un autor por ID'
router.get('/:id', authorController.getAuthorById);

// #swagger.tags = ['Authors']
// #swagger.summary = 'Crear un nuevo autor'
// #swagger.security = [{ "BearerAuth": [] }]
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Author' } }
router.post('/', isAuthenticate, validateCreateAuthor, authorController.createAuthor);

// #swagger.tags = ['Authors']
// #swagger.summary = 'Actualizar un autor por ID'
// #swagger.security = [{ "BearerAuth": [] }]
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Author' } }
router.put('/:id', isAuthenticate, validateUpdateAuthor, authorController.updateAuthor);

// #swagger.tags = ['Authors']
// #swagger.security = [{ "BearerAuth": [] }]
// #swagger.summary = 'Eliminar un autor por ID'
router.delete('/:id', isAuthenticate, authorController.deleteAuthor);


module.exports = router;