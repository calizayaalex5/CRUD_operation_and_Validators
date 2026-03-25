const isAuthenticate = (req, res, next) => {
    if (req.sesion.user === undefined) {
        return res.status(401).json("No tienes acceso.")
    }
    next()
}

module.exports = {
    isAuthenticate
}