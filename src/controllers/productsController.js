const db = require('../database/models');

const controller = {
    list: function(req, res) {
        db.Product.findAll()
            .then(function(product) {
                console.log(product);
                
            })
    },

    create: function(req, res) {
    
    },

    processCreate: function(req, res) {
    
    },

    edit: function(req, res) {
    
    },

    processEdit: function(req, res) {
    
    },

    detail: function(req, res) {
    
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
