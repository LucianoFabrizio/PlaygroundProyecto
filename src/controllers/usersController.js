const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, DATE } = require('sequelize');
const { validationResult } = require('express-validator');


const Users = db.User;

const usersController = {
    list: (req, res) => {
        db.User.findAll()
            .then((users) => {
                res.render('user-list.ejs', { users });
            })
            .catch((error) => res.send(error));
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then((user) => {
                res.render('user-detail.ejs', { user });
            })
            .catch((error) => res.send(error));
    },
    register: function (req, res) {
        res.render('user-register.ejs');
    },
    create: function (req, res) {
        const resultValidation = validationResult(req);
        // console.log(resultValidation)
        if (resultValidation.errors.length > 0) {
            return res.render('user-register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        } else {
        Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: false,
            creation_date: Date.now()
            
        })
            .then(() => {
                return res.redirect('/');
            })
            .catch((error) => res.send(error));
    }},
    
    login: function (req, res){
        res.render('user-login.ejs')
    },

    processLogin: (req, res) => {
        const emailUser = req.body.email;
        const passwordUser = req.body.password;

        const userToLogin = db.User.findOne({
            where: {
                email: emailUser,
                password: passwordUser
            }
        })      
          .then((e) => {
          
              req.session.loggedUser = e.dataValues
              
            // let comparePassbCrypt = bcrypt.compareSync(
            //     req.body.password,
            //     userToLogin.password
            // );
            // if (comparePassbCrypt) {
                return res.redirect('/')})
                
            .catch((error => 
             res.render('user-login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas',
                    }
                }
            }) ))
    },


    edit: function (req,res) {
        Users.findByPk(req.params.id)
            .then((user) => {
                res.render('user-edit.ejs', { user });
            })
            .catch((error) => res.send(error));
    },
    update: function (req ,res) {
        let userId = req.params.id;
        Users
        .update(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password[1] // Esto está así para que lo pueda cargar la DB, luego vemos como lo arreglamos
                
            },
            {
                where: {id: userId}
            })
        .then(()=> {
            return res.redirect('/')})
        .catch(error => res.send(error))
    },
     delete: function (req,res) {
         Users
         .findByPk(req.params.id)
         .then((user) => {
            res.render('user-delete.ejs', { user });
        })
         .catch(error => res.send(error))
     },
     destroy: function (req,res) {
         let userId = req.params.id;
         Users
         .destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
         .then(()=>{
             return res.redirect('/')})
         .catch(error => res.send(error))
     }
};

module.exports = usersController;
