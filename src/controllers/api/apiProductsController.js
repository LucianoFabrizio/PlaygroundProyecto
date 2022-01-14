const db = require('../../database/models');
const Products = db.Product;
const path = require('path');

const controller = {
    list: (req,res) => {
        
        let urlProduct = "http://localhost:3000/products/detail/"
        let arrayProducts = [];
        let objectCategories = {
            consola: 0,
            juego: 0,
            accesorio: 0
        }
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
            console.log(e.length)
        for (let i = 0; i < e.length ; i++){
     

            if (e[i].category_id == 1){
                objectCategories.consola += 1
            } else if (e[i].category_id == 2){
                objectCategories.juego += 1
            } else if (e[i].category_id == 3){
                objectCategories.accesorio += 1
        }
    }
            let dataProducts = {
                count: e.length,
                countByCategory: objectCategories,
                products: arrayProducts

            }
            return res.json(dataProducts)


    }
        )
    },


    detail: (req,res) => {
        
        Products.findByPk(req.params.id)
        .then((product) => {
           
            let apiProduct = {
                id: product.id,
                name: product.name,
                image:  product.image,
                "creation-date": product.creation_date,
                "modified-date": product.modified_date,
                price: product.price,
                description: product.description,
                relations: [ {categories: {
                    consola: 1,
                    juego: 2,
                    accesorio: 3
                }}, { brands: {
                    Sony: 1,
                    Nintendo: 2,
                    Microsoft: 3
                }
                } ],
                category_id: product.category_id,
                brand_id: product.brand_id
            }
           return res.json(apiProduct)
        })
      
    }
}

module.exports = controller;
