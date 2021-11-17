const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const consolas = products.filter(function (product) {
    return product.tipoProd == 'consola';
});
const juegos = products.filter(function (product) {
    return product.tipoProd == 'juego';
});

const controlador = {
    index: (req, res) => {
        res.render('index', {
            consolas,
            juegos,
        });
    },
    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = controlador;
