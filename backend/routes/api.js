const express = require('express')
const router = express.Router()

const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Empreendimento = require('../models/Empreendimento') //ESTRUTURA DOS EMPREENDIMENTOS NO DB
const Cidade = require('../models/Cidade') //ESTRUTURA DAS CIDADES NO DB
const Bairro = require('../models/Bairro') //ESTRUTURA DOS BAIRROSS NO DB
const Image = require('../models/Image') //ESTRUTURA DAS IMAGENS NO DB
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
			.populate([
				{
					path: "bairro",
					select: 'name'
				},
				{
					path: "cidade",
					select: 'name'
				}
			])
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
	.put('/empreendimentos/:id', (req, res) => {
		const data = {
			$set: {
				"title": req.body.title,
				"price": req.body.price,
				"status": req.body.status,
				"type": req.body.type,
				"cidade": req.body.cidade,
				"bairro": req.body.bairro,
				"quartos": req.body.quartos,
				"suites": req.body.suites,
				"banheiros": req.body.banheiros,
				"details": req.body.details,
				"images": req.body.images,
			}
		}
		Empreendimento.updateOne({ _id: req.params.id }, data)
			.then(data => res.sendStatus(202))
			.catch(err => console.log(err))
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
			.populate('cidade', 'name')
			.skip()
			.limit(0)
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.get('/bairros/:id', (req, res) => {
		Bairro.find({ cidade: req.params.id})
			.populate('cidade', 'name')
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.post('/bairros', (req, res) => {
		Bairro.insertMany(req.body)
			.then(res.sendStatus(200))
			.catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/images', (req, res) => {
		Image.find()
			.populate('cidade', 'name')
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.get('/images/:id', (req, res) => {
		Image.findOne({ _id: req.params.id })
			.populate('cidade', 'name')
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.post('/images', (req, res) => {
		Image.insertMany(req.body)
			.then(res.sendStatus(200))
			.catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = router