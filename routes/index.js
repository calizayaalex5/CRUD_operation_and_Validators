const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello World");
});

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));
router.use('/api-docs', require('./swagger'));


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
    });
});

module.exports = router;