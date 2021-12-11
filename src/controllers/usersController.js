const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, DATE } = require('sequelize');

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
        res.render('register.ejs');
    },
    create: function (req, res) {
        Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: 0,
            creation_date: DATE,
        })
            .then(() => {
                return res.redirect('/');
            })
            .catch((error) => res.send(error));
    },
    edit: function (req, res) {
        Users.findByPk(req.params.id)
            .then((user) => {
                res.render('user-edit.ejs', { user });
            })
            .catch((error) => res.send(error));
    },
    update: function (req,res) {
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
    }
    // delete: function (req,res) {
    //     let movieId = req.params.id;
    //     Movies
    //     .findByPk(movieId)
    //     .then(Movie => {
    //         return res.render(path.resolve(__dirname, '..', 'views',  'moviesDelete'), {Movie})})
    //     .catch(error => res.send(error))
    // },
    // destroy: function (req,res) {
    //     let movieId = req.params.id;
    //     Movies
    //     .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
    //     .then(()=>{
    //         return res.redirect('/movies')})
    //     .catch(error => res.send(error))
    // }
};

module.exports = usersController;
