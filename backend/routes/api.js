const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Product = require('../models/Product') //ESTRUTURA DOS PRODUTOS NO DB
const Message = require('../models/Message') //ESTRUTURA DAS MENSAGENS NO DB

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
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.get('/products/:id', (req, res) => {
		Product.findOne({_id: req.params.id})
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/messages', (req, res) => {
		Message.find()
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.get('/messages/:id', (req, res) => {
		Message.findOne({_id: req.params.id})
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
module.exports = router