const session = require('express-session');

function adminRedirect (req, res, next) {

        // Chequear si está logueado
        if (!req.session.loggedUser) {
            
            return res.redirect('/users/login');
        } else {
            // Chequear si es administrador
            if (req.session.loggedUser.admin == true) {
                return res.redirect('/users/admin/' + req.session.loggedUser.id);
            }
        }

    next();
}

module.exports = adminRedirect;
