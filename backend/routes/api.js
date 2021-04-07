const express = require('express')
const router = express.Router()

const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Empreendimento = require('../models/Empreendimento') //ESTRUTURA DOS PRODUTOS NO DB
const Cidade = require('../models/Cidade') //ESTRUTURA DOS PRODUTOS NO DB
const Bairro = require('../models/Bairro') //ESTRUTURA DOS PRODUTOS NO DB
const Message = require('../models/Message') //ESTRUTURA DAS MENSAGENS NO DB
const Config = require('../models/Config') //ESTRUTURA DAS CONFIGURAÇÕES NO DB

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

	.get('/carousel', (req, res) => {
		Config.find()
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

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.post('/messages/send', (req, res) => {
		new Message(req.body).save().then(
			res.sendStatus(200)
		).catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/empreendimentos', (req, res) => {
		Empreendimento.find()
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.get('/empreendimentos/:id', (req, res) => {
		Empreendimento.findOne({_id: req.params.id })
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.post('/empreendimentos', (req, res) => {
		new Empreendimento(req.body).save().then(
			res.sendStatus(200)
		).catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/cidades', (req, res) => {
		Cidade.find()
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.post('/cidades', (req, res) => {
		new Cidade(req.body).save().then(
			res.sendStatus(200)
		).catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/bairros', (req, res) => {
		Bairro.find()
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.post('/bairros', (req, res) => {
		Bairro.insertMany(req.body).then(
			res.sendStatus(200)
		).catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = router