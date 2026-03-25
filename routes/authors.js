const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController')
const { validateCreateAuthor, validateUpdateAuthor } = require('../validators/validationAuthor')
const { isAuthenticate } = require('../middleware/authenticate')

router.get('/', authorController.getAuthors);
// #swagger.tags = ['Authors']
// #swagger.summary = 'Obtener todos los autores'

router.get('/:id', authorController.getAuthorById);
// #swagger.tags = ['Authors']
// #swagger.summary = 'Obtener un autor por ID'

router.post('/', isAuthenticate, validateCreateAuthor, authorController.createAuthor);
// #swagger.tags = ['Authors']
// #swagger.summary = 'Crear un nuevo autor'
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Author' } }

router.put('/:id', isAuthenticate, validateUpdateAuthor, authorController.updateAuthor);
// #swagger.tags = ['Authors']
// #swagger.summary = 'Actualizar un autor por ID'
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/Author' } }

router.delete('/:id', isAuthenticate, authorController.deleteAuthor);
// #swagger.tags = ['Authors']
// #swagger.summary = 'Eliminar un autor por ID'

module.exports = router;