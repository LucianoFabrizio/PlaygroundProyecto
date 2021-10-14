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
    productCart : (req, res) => {
    res.render(path.resolve(__dirname, '../views/productCart.ejs'));
},
    register : (req,res) => {
    res.render(path.resolve(__dirname, '../views/register.ejs'));
},
    login: (req,res) => {
    res.render(path.resolve(__dirname, '../views/login.ejs'));
}, 
    productPage:(req,res) => {
   res.render(path.resolve(__dirname, '../views/productPage.ejs'));
},
    createProd:(req,res) => {
    res.render(path.resolve(__dirname, '../views/createProd.ejs'));
 },
 modifyProd:(req,res) => {
    res.render(path.resolve(__dirname, '../views/modifyProd.ejs'), {listaProd: listaProd});
 }
}        


module.exports=controlador