const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const consolas = products.filter(function(product){
	return product.tipoProd == 'consola'
})
const juegos = products.filter(function(product){
	return product.tipoProd == 'juego'
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
		console.log(req.file);
		let newProduct = {
			id: Date.now(),
			image: req.file.filename,
			...req.body,
		};
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	// Formulario de edición de productos
	edit: (req, res) => {
		let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('product-edit', {product})
	},
	// Acción de edición (a donde se envía el formulario):
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)
		let productoToEdited = {}

		if (req.body.image == productToEdit.image) {
		productToEdited = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image,
		};
	} else {
		productToEdited = {
			id: productToEdit.id,
			...req.body,	
	}
	}		
		let newProducts = products.map(product => {
			if (product.id == productToEdited.id) {
				return product = productToEdited;
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
	},
	// Acción de borrado
	delete : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	}
};

module.exports = controller;