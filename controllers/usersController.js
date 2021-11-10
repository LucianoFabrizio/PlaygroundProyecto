const { profile } = require('console');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

    register: (req,res) => {
        res.render('register');
    },

    store: (req, res) => {
		
		let image = req.file != undefined ? req.file.filename : 'default.png';
		
		// console.log(req.body);

		const resultValidation = validationResult(req);

		let newUser = {
			id: Date.now(),
			image: image,
			...req.body,
		};
		users.push(newUser) 
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

		
		if (resultValidation.errors.length > 0) {
			return res.render('register', 
			{ errors: resultValidation.mapped()}
			)	 
		}
		// res.redirect('/');
	},

    login: (req,res) => {
        res.render('login');
    },

    processLogin: (req,res) => {

    },

    detail: (req,res) => {
        let id = req.params.id
		let user = users.find(user => user.id == id)
		res.render('user-detail', {
			user
		})
    },
    
    edit: (req,res) => {
        let id = req.params.id
		let user = users.find(user => user.id == id)
		res.render('user-edit', {
			users
		})
    },
    
    update: (req,res) => {

    },

    delete : (req, res) => {
		let id = req.params.id;
		let finalUsers = users.filter(user => user.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
		res.redirect('/');
	}


	}


module.exports = controller