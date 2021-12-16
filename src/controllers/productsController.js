const db = require('../database/models');
const { Op } = require("sequelize")


const controller = {
    list: function(req, res) {
        db.Product.findAll()
            .then(function(product) {
                console.log(product);
                
            })
    },

    search: function(req,res) {
        const prodName = req.query.prodSearch
        
        db.Product.findAll({
            where: {
                name: {
                    [Op.like]:
                 '%' + prodName + '%'
                }
            }
        })
        .then((product) => {
            console.log(product)
            res.render('products.ejs', { product })

            // res.redirect('/products/')
        })
        .catch(error => res.redirect('/'))
    },


    create: function(req, res) {
        res.render('product-create.ejs')
    },

    processCreate: function(req, res) {
        db.Product.create({
            name: req.body.name,
            image: req.body.imgProd,
            creation_date: Date.now(),
            modified_date: Date.now(),
            deletion_date: null,
            price: req.body.precio,
            gallery: req.body.imgProd,
            category_id: req.body.tipoProd,
            brand_id: req.body.marca
            
        })
            .then(() => {
                return res.redirect('/create');
            })
            .catch((error) => res.send(error));

    },

    edit: function(req, res) {
     res.render('product-edit.ejs')
    },

    processEdit: function(req, res) {
    
    },

    detail: function(req, res) {
        db.Product.findByPk(req.params.id)
            .then((product) => {
                res.render('detail.ejs', { product });
            })
            .catch((error) => res.send(error));
    },
    

    delete: function(req, res) {
        let productId = req.params.id;
        Users
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error))
    }
}


module.exports = controller;
