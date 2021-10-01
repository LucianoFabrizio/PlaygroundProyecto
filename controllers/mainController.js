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
}        


module.exports=controlador