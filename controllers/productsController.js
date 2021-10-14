const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const consolas = products.filter(function(product){
	return product.tipoProd == 'Consola'
})
const juegos = products.filter(function(product){
	return product.tipoProd == 'Juego'
})

const controller = {
	// Listado de productos
	index : (req, res) => {
        res.render('products', {
			consolas,
			juegos,
		});
    },

	// Detalle de un producto particular
	detail: (req, res) => {
		let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('detail', {
			product
		})
	},

	// Formulario de creación de productos
	create: (req, res) => {
		res.render('product-create')
	},
	
	// Acción de creación (a donde se envía el formulario)
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: 'default-image.png'
		};
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	// Formulario de edición de productos
	edit: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
		res.render('product-edit', {productToEdit})
	},

	// Acción de borrado
	destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	}
};

module.exports = controller;