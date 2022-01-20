const session = require('express-session');

function authMiddleware(req, res, next) {
    
    // Chequear si está logueado
    if (!req.session.loggedUser) {
        return res.redirect('/users/login');
    } 
    next();
}

module.exports = authMiddleware;
