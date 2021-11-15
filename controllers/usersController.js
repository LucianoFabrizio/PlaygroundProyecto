const { profile } = require('console');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const consolas = products.filter(function(product){
	return product.tipoProd == 'consola'
})
const juegos = products.filter(function(product){
	return product.tipoProd == 'juego'
})

const controller = {

    register: (req,res) => {
        res.render('register');
    },

    store: (req, res) => {
		
		let image = req.file != undefined ? req.file.filename : 'default.png';
		
		// console.log(req.body);

		const resultValidation = validationResult(req);


		
		if (resultValidation.errors.length > 0) {
			return res.render('register', 
			{ errors: resultValidation.mapped(),
			  oldData: req.body
			})	 
		} else {
			
		let newUser = {
			id: Date.now(),
			...req.body,
			password: bcrypt.hashSync(req.body.password, 10),
			image: image
			
		};
		users.push(newUser) 
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		return  res.render('index', {
			consolas,
			juegos
		});
	} 
		
	},

    login: (req,res) => {
        res.render('login');
    },

    processLogin: (req,res) => {
		let email = req.body.email;
		let userToLogin = users.find( user => user.mail == email);

		if (userToLogin) {
			let comparePassbCrypt = bcrypt.compareSync(req.body.password, userToLogin.password)
			if (comparePassbCrypt){
				return res.redirect('/users/'+userToLogin.id)
			}
				return res.render('login', {errors: {
					email: {
						msg: 'las credenciales son invalidas'
					}}})}
		

		return res.render('login', {errors: {
		email: {
			msg: 'email no registrado'
		}
		
		}
		})

		return res.send(userToLogin)
		},

    detail: (req,res) => {
        let id = req.params.id
		let user = users.find(user => user.id == id)
		res.render('user-detail', {
			user: user
		})
    },
    
    edit: (req,res) => {
        let id = req.params.id
		let user = users.find(user => user.id == id)
		res.render('user-edit', {
			user
		})
    },
    
    update: (req, res) => {
		let id = req.params.id;
		let userToEdit = users.find(user => user.id == id)
		let image
		if(req.file != undefined){
			image = req.file.filename
		} else {
			image = userToEdit.image
		}

		userToEdit = {
			id: userToEdit.id,
			...req.body,
			image: image,
		};

		console.log(userToEdit);
		
		let newUsers = user.map(user => {
			if (user.id == newUser.id) {
				return user = {...newUser};
			}
			return user;
		})

		fs.writeFileSync(usersFilePath, JSON.stringify(newUsers, null, ' '));
		res.redirect('/');
	},

    delete : (req, res) => {
		let id = req.params.id;
		let finalUsers = users.filter(user => user.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
		res.redirect('/');
	}


}


module.exports = controller