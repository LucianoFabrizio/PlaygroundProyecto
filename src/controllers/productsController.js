const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');


const Products = db.Product;

const controller = {
    list: function (req, res) {
        Products.findAll()
            .then((product) => {
                res.render('product-list.ejs', { product });
            })
            .catch((error) => res.redirect('/'));
    },
    admin: function (req, res) {
        Products.findAll()
            .then((product) => {
                res.render('admin-products-list.ejs', { product });
            })
            .catch((error) => res.redirect('/'));
    },
    cart: function (req, res) {
        res.render('product-cart.ejs');
    },

    search: function (req, res) {
        const prodName = req.query.prodSearch;

        Products.findAll({
            where: {
                name: {
                    [Op.like]: '%' + prodName + '%',
                },
            },
        })
            .then((product) => {
                // console.log(product);
                res.render('product-search.ejs', { product, prodName });

                // res.redirect('/products/')
            })
            .catch((error) => res.redirect('/'));
    },

    create: function (req, res) {
        res.render('product-create.ejs');
    },

    processCreate: function (req, res) {
        const resultValidation = validationResult(req);
        console.log(resultValidation.errors)
        if (resultValidation.errors.length > 0) {
            return res.render('product-create', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        } else { 


            
            ///// CHEQUIAR IMAGEN



        Products.create({
            name: req.body.name,
            image: req.file.filename,
            creation_date: Date.now(),
            modified_date: null,
            deletion_date: null,
            price: req.body.price,
            description: req.body.description,
            gallery: null,
            category_id: req.body.category,
            brand_id: req.body.brand,
        })
            .then(() => {
                return res.redirect('/');
            })
            .catch((error) => res.send(error));
    }},

    edit: function (req, res) {
        Products.findByPk(req.params.id)
            .then((product) => {
                res.render('product-edit.ejs', { product });
            })
            .catch((error) => res.send(error));
    },

    processEdit: function (req, res) {
        let prodId = req.params.id;
        // console.log('BODY', req.body);
         // console.log(req.body);
         const resultValidation = validationResult(req);
         console.log(resultValidation)
         Products.findByPk(req.params.id)
         .then((product) => {
         if (resultValidation.errors.length > 0) {
             return res.render('product-edit', {
                 product,
                 errors: resultValidation.mapped(),
                 oldData: req.body,
             });
            } else { 
        Products.update(
            {
                name: req.body.name,
                image: req.file.filename,
                modified_date: Date.now(),
                price: req.body.price,
                description: req.body.description,
                category_id: req.body.category,
                brand_id: req.body.brand
            },
            {
                where: { id: prodId },
            }
        )
            .then(() => {
                return res.redirect('/');
            })
            .catch((error) => res.send(error));}})
    },

    detail: function (req, res) {
        Products.findByPk(req.params.id)
            .then((product) => {
                res.render('product-detail.ejs', { product });
            })
            .catch((error) => res.send(error));
    },

    delete: function (req, res) {
        let productId = req.params.id;
        Products.destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/products/admin');
            })
            .catch((error) => res.send(error));
    },
};

module.exports = controller;
