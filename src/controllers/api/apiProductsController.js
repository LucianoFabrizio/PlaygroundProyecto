const db = require('../../database/models');
const Products = db.Product;


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

    }
}

module.exports = controller;
