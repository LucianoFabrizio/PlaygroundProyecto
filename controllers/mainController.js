const path = require("path")

const listaProd = [
    { 
        id: 1,
        prod_name: "PlayStation 5" ,
        marca: "PlayStation",
        tipoProd: "Consola",
        imgProd: "../public/img/ps5-product.jpg",
        precio: 150000,
        descripcion: "lorem ipsum"
    },
    { 
        id: 1,
        prod_name: "Nintendo Switch" ,
        marca: "Nintendo",
        tipoProd: "Consola",
        imgProd: "../public/img/switch-product.jpg",
        precio: 125000,
        descripcion: "lorem ipsum"
    }
]

const controlador = {
    index : (req, res) => {
    res.render(path.resolve(__dirname, '../views/index.ejs'))
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
}        


module.exports=controlador