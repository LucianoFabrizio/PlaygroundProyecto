const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))

const controller = {

    register: (req,res) => {
        res.render('register');
    },

    store: (req,res) => {

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

    delete: (req,res) => {
        let id = req.params.id;
		let finalUsers = users.filter(user => user.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
		res.redirect('/');
    }
}

module.exports = controller