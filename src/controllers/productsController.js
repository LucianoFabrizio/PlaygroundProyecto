const db = require('../database/models');
const { Op } = require('sequelize');

const Products = db.Product;

const controller = {
    list: function (req, res) {
        Products.findAll().then(function (product) {
            console.log(product);
        });
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
                console.log(product);
                res.render('product-list.ejs', { product });

                // res.redirect('/products/')
            })
            .catch((error) => res.redirect('/'));
    },

    create: function (req, res) {
        res.render('product-create.ejs');
    },

    processCreate: function (req, res) {
        console.log(req.body);
        Products.create({
            name: req.body.name,
            image: req.file.filename,
            creation_date: Date.now(),
            modified_date: null,
            deletion_date: null,
            price: req.body.price,
            gallery: null,
            category_id: req.body.category,
            brand_id: req.body.brand,
        })
            .then(() => {
                return res.redirect('/');
            })
            .catch((error) => res.send(error));
    },

    edit: function (req, res) {
        Products.findByPk(req.params.id)
            .then((product) => {
                res.render('product-edit.ejs', { product });
            })
            .catch((error) => res.send(error));
    },

    processEdit: function (req, res) {
        let prodId = req.params.id;
        console.log(req.body);
        Products.update(
            {
                name: req.body.name,
                image: req.body.image,
                modified_date: Date.now(),
                price: req.body.precio,
                gallery: req.body.imgProd,
                category_id: req.body.tipoProd,
                brand_id: req.body.marca,
            },
            {
                where: { id: prodId },
            }
        )
            .then(() => {
                return res.redirect('/');
            })
            .catch((error) => res.send(error));
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
                return res.redirect('/');
            })
            .catch((error) => res.send(error));
    },
};

module.exports = controller;
