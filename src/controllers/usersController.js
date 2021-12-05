const db = require('../database/models');

const controller = {
    list: function(req, res) {
        db.User.findAll()
            .then(function(user) {
                console.log(user);
                
            })
    }

}

module.exports = controller;
