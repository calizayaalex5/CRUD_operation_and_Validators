const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true,
        min: 1
    },
    genre: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: 'Español' 
    }
});

module.exports = mongoose.model('Book', BookSchema);