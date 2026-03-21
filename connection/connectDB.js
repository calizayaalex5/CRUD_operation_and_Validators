// en este modulo se realizara la conexion con mongoDb y luego 
// se exportara al modulo principal de la APP


const mongoose = require('mongoose') 
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('|| BASE DE DATOS INICIADA ||')
    } catch (err) {
        console.error('|| ERROR DE INICIO DE LA BASE DE DATOS ||', err)
        process.exit(1)
    }
}

module.exports = connectDB  