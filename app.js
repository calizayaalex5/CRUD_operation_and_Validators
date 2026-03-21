const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next()
})

// Rutas
app.use('/', require('./routes'))

// Ruta 404
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" })
})

// Error handler Global
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: err.message || "Error interno del servidor" })
})

// Conexión y arranque
const connectDB = require('./connection/connectDB') 
const startServer = async () => {
    try {
        await connectDB() 
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto: ${port}`)
        })
    } catch (err) {
        console.error('Error al iniciar el servidor:', err)
        process.exit(1)
    }
}

startServer()