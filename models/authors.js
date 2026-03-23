// models/authors.js
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'El nombre es requerido'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'El apellido es requerido'],
            trim: true
        },
        nationality: {
            type: String,
            required: [true, 'La nacionalidad es requerida'],
            trim: true
        },
        birthDate: {
            type: Date,
            required: [true, 'La fecha de nacimiento es requerida']
        },
        bio: {
            type: String,
            required: [true, 'La biografía es requerida'],
            trim: true
        },
        genre: {
            type: String,
            required: [true, 'El género literario es requerido'],
            trim: true
        },
        activeYears: {
            type: Number,
            required: [true, 'Los años activo son requeridos'],
            min: [1, 'Los años activo deben ser mayor a 0']
        },
        website: {
            type: String,
            trim: true,
            default: null
        }
    },
    {
        timestamps: true  
    }
)

module.exports = mongoose.model('Author', authorSchema)