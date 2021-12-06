const db = require('../database/models');

const controller = {
    list: function(req, res) {
        db.Product.findAll()
            .then(function(product) {
                console.log(product);
                
            })
    }

}

module.exports = controller;
