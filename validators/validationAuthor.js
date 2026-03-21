const { check } = require("express-validator")
const { validateResult } = require("../helpers/validateHelpers")

const validateCreateAuthor = [
    check('firstName')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío'),

    check('lastName')
        .exists().withMessage('El apellido es requerido')
        .not().isEmpty().withMessage('El apellido no puede estar vacío'),

    check('nationality')
        .exists().withMessage('La nacionalidad es requerida')
        .not().isEmpty().withMessage('La nacionalidad no puede estar vacía'),

    check('birthDate')
        .exists().withMessage('La fecha de nacimiento es requerida')
        .isDate().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)'),

    check('bio')
        .exists().withMessage('La biografía es requerida')
        .not().isEmpty().withMessage('La biografía no puede estar vacía'),

    check('genre')
        .exists().withMessage('El género literario es requerido')
        .not().isEmpty().withMessage('El género literario no puede estar vacío'),

    check('activeYears')
        .exists().withMessage('Los años activo son requeridos')
        .isNumeric().withMessage('Los años activo deben ser un número')
        .isInt({ min: 1 }).withMessage('Los años activo deben ser mayor a 0'),

    check('website')
        .optional()
        .isURL().withMessage('El sitio web debe ser una URL válida'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateAuthor = [
    check('firstName')
        .optional()
        .not().isEmpty().withMessage('El nombre no puede estar vacío'),

    check('lastName')
        .optional()
        .not().isEmpty().withMessage('El apellido no puede estar vacío'),

    check('nationality')
        .optional()
        .not().isEmpty().withMessage('La nacionalidad no puede estar vacía'),

    check('birthDate')
        .optional()
        .isDate().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)'),

    check('bio')
        .optional()
        .not().isEmpty().withMessage('La biografía no puede estar vacía'),

    check('genre')
        .optional()
        .not().isEmpty().withMessage('El género literario no puede estar vacío'),

    check('activeYears')
        .optional()
        .isNumeric().withMessage('Los años activo deben ser un número')
        .isInt({ min: 1 }).withMessage('Los años activo deben ser mayor a 0'),

    check('website')
        .optional()
        .isURL().withMessage('El sitio web debe ser una URL válida'),

    validateResult
]

module.exports = { validateCreateAuthor, validateUpdateAuthor }