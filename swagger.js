const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Books API",
        description: "API REST para gestionar una librería. Permite administrar libros y autores.",
        version: "1.0.0",
        contact: {
            name: "Alex Calizaya"
        }
    },
    host: "https://crud-operation-and-validators.onrender.com",
    schemes: ["https"],

    securityDefinitions: {
        oauth2: {
            type: "oauth2",
            authorizationUrl: "https://github.com/login/oauth/authorize",
            flow: "implicit",
            scopes: {
                read: "read",
                write: "write"
            }
        }
    },

    security: [
        {
            oauth2: ['user']
        }
    ],
    
    definitions: {
        Book: {
            type: "object",
            properties: {
                title: { type: "string", example: "Cien años de soledad" },
                description: { type: "string", example: "Una saga familiar en Macondo" },
                author: { type: "string", example: "Gabriel García Márquez" },
                pages: { type: "integer", example: 417 },
                genre: { type: "string", example: "Realismo mágico" },
                publishedDate: { type: "string", example: "1967-05-30" },
                lenguage: { type: "string", example: "Español" }
            }
        },
        Author: {
            type: "object",
            properties: {
                firstName: { type: "string", example: "Gabriel" },
                lastName: { type: "string", example: "García Márquez" },
                nationality: { type: "string", example: "Colombiana" },
                birthDate: { type: "string", example: "1927-03-06" },
                bio: { type: "string", example: "Escritor colombiano, Nobel de Literatura." },
                genre: { type: "string", example: "Realismo mágico" },
                activeYears: { type: "integer", example: 50 },
                website: { type: "string", example: "https://www.example.com" }
            }
        },
        Error: {
            type: "object",
            properties: {
                message: { type: "string", example: "Descripción del error" }
            }
        }
    }
};

const outputFile = './swagger.json'
const endPointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endPointsFiles, doc)