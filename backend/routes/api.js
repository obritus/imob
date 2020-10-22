const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Product = require('../models/Product') //ESTRUTURA DOS USUÁRIOS NO DB

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	router.get('/', (req, res) => {
		res.sendStatus(200)
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/usuarios', (req, res) => {
		Usuario.find().then(data => {
			res.json(data)
		}).catch(err => {
			console.log(err)
		})
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/products', (req, res) => {
		Product.find()
			.then(data => res.send(data))
			.catch(err => console.log(err))
	})
	.get('/products/:id', (req, res) => {
		Product.findOne({_id: req.params.id})
			.then(data => res.send(data))
			.catch(err => console.log(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = router