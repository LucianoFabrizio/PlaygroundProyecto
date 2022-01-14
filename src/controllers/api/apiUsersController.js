const db = require('../../database/models');
const Users = db.User;
const {Op} = require('sequelize');
const usersController = require('../usersController');


const controller = {

    list: (req, res) => {
        let urlUser = "http://localhost:3000/users/detail/"
            let arrayUsers = [];
        Users.findAll({
            raw: true
        })
        .then((e) => {
            e.forEach( user =>  arrayUsers.push(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    URL: urlUser + user.id
                }
            ))

                let dataUsers = {
                    count: e.length,
                    users: arrayUsers
                }
                return res.json(dataUsers)

    
        }
            )
        },


    detail: (req, res) => {
        db.User.findByPk(req.params.id)
        .then((user) => {
            let apiUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                "creation-date": user.creation_date
            }
           return res.json(apiUser)
        })
      
    }


};

module.exports = controller;
