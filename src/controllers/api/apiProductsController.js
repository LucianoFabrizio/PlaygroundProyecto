const db = require('../../database/models');
const Products = db.Product;


const controller = {
    list: (req,res) => {
        
        let urlProduct = "http://localhost:3000/products/detail/"
        let arrayProducts = [];
    Products.findAll({
        raw: true
    })
    .then((e) => {
        e.forEach( product =>  arrayProducts.push(
            {
                id: product.id,
                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
                relations: ['categories', 'brands'],
                URL: urlProduct + product.id
            }
        ))

            let dataProducts = {
                count: e.length,
                products: arrayProducts
            }
            return res.json(dataProducts)


    }
        )
    },


    detail: (req,res) => {

    }
}

module.exports = controller;
