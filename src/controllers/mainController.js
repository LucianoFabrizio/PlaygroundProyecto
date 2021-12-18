const db = require('../database/models');
const { Op } = require('sequelize');

const Products = db.Product;

const controlador = {
    index: function (req, res) {
        Products.findAll({
            raw: true,
           })
            .then((products) => {
                const consoles = products.filter(function (product) {
                    return product.category_id == 1;
                });
                const games = products.filter(function (product) {
                    return product.category_id == 2;
                });
                const accessories = products.filter(function (product) {
                    return product.category_id == 3;
                });
                res.render('index.ejs', { consoles, games, accessories });
            })
            .catch((error) => console.log(error));
    }
};

module.exports = controlador;
