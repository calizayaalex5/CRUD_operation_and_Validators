const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const connectDB = require('./connection/connectDB') 
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors ({ 
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-Key']
}))

app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }))
app.use(passport.initialize())
app.use(passport.session())

//passport github
passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile)
    })
)

passport.serializeUser((user, done) => {done (null, user)})
passport.deserializeUser((user, done) => {done (null, user)})

// Rutas
app.get('/', (req, res) => {
    res.send(req.session?.user 
        ? `Logged in as ${req.session.user.displayName || req.session.user.username}` 
        : 'Logged Out')
})

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs' }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/')
    });

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