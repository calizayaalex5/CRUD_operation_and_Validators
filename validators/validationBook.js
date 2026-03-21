const { check } = require ("express-validator")
const { validateResult } = require ("../helpers/validateHelpers")

const validateCreate = [
    check('title')
        .exists().withMessage("El tituto es requerido")
        .not().isEmpty().withMessage("El titulo no puede estar vacio"),
    check('description')
        .exists().withMessage('La descripción es requerida')
        .not().isEmpty().withMessage('La descripción no puede estar vacía'),

    check('author')
        .exists().withMessage('El autor es requerido')
        .not().isEmpty().withMessage('El autor no puede estar vacío'),

    check('pages')
        .exists().withMessage('Las páginas son requeridas')
        .isNumeric().withMessage('Las páginas deben ser un número entero')
        .isInt({ min: 1 }).withMessage('Las páginas deben ser mayor a 0'),

    check('genre')
        .exists().withMessage('El género es requerido')
        .not().isEmpty().withMessage('El género no puede estar vacío'),

    check('publishedDate')
        .exists().withMessage('La fecha de publicación es requerida')
        .isDate().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)'),

    check('lenguage')
        .exists().withMessage('Es necesario espcificar el idioma')
        .not().isEmpty().withMessage('El idioma no puede estar vacio'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdate = [
    check('title')
        .optional()
        .not().isEmpty().withMessage('El título no puede estar vacío'),

    check('description')
        .optional()
        .not().isEmpty().withMessage('La descripción no puede estar vacía'),

    check('author')
        .optional()
        .not().isEmpty().withMessage('El autor no puede estar vacío'),

    check('pages')
        .optional()
        .isNumeric().withMessage('Las páginas deben ser un número entero')
        .isInt({ min: 1 }).withMessage('Las páginas deben ser mayor a 0'),

    check('genre')
        .optional()
        .not().isEmpty().withMessage('El género no puede estar vacío'),

    check('publishedDate')
        .optional()
        .isDate().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)'),
    
    check('lenguage')
        .optional()
        .not().isEmpty().withMessage('El idioma no puede estar vacio'),

    validateResult
]

module.exports = { validateCreate, validateUpdate }