const fs = require('fs');
const path = require('path');

const controlador = {
    index: function (req, res) {
        Products.findAll()
            .then((products) => {
                products.forEach(element => {
                    
                });
                res.render('index.ejs', { products });
            })
            .catch((error) => res.redirect('/'));
    }
};

module.exports = controlador;
