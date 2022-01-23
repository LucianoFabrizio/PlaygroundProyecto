const session = require('express-session');

function authMiddleware(req, res, next) {
    // Chequear si está logueado
    if (!req.session.loggedUser) {
        
        return res.redirect('/users/login');
    } else {
        // Chequear si es administrador
        if (req.session.loggedUser.admin != true) {
            // No es administrador
            return res.render('accessDenied');;
        }
    }

    next();
}

module.exports = authMiddleware;
