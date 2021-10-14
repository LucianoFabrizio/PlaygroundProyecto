const path = require("path")

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
 modifyProd:(req,res) => {
    res.render(path.resolve(__dirname, '../views/modifyProd.ejs'), {listaProd: listaProd});
 }
}        


module.exports=controlador