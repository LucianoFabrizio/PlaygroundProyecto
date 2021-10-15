const fs = require('fs');
const path = require("path")

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const consolas = products.filter(function(product){
	return product.tipoProd == 'Consola'
})
const juegos = products.filter(function(product){
	return product.tipoProd == 'Juego'
})

const controlador = {
    index : (req, res) => {
        res.render('index', {
			consolas,
			juegos,
		});
    },
    login :(req, res) => {
        res.render('login');
    },
    register :(req, res) => {
        res.render('register');
    },
    cart :(req, res) => {
        res.render('cart');
    }
}        


module.exports=controlador