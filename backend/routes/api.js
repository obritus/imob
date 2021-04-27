const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Empreendimento = require('../models/Empreendimento') //ESTRUTURA DOS EMPREENDIMENTOS NO DB
const Cidade = require('../models/Cidade') //ESTRUTURA DAS CIDADES NO DB
const Bairro = require('../models/Bairro') //ESTRUTURA DOS BAIRROSS NO DB
const Image = require('../models/Image') //ESTRUTURA DAS IMAGENS NO DB
const Message = require('../models/Message') //ESTRUTURA DAS MENSAGENS NO DB
const Config = require('../models/Config') //ESTRUTURA DAS CONFIGURAÇÕES NO DB

const multerConfigs = {
	dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, multerConfigs.dest)
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err)
				let extension = file.originalname.slice(-4)
				let filename = `${hash.toString('hex') + extension}`
				cb(null, filename)
			})
		}
	}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = [
			'image/jpeg',
			'image/png'
		]
		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error("Tipo de arquivo inválido"))
		}
	}
}

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
		//REMOVER ITENS NULLOS DO REQ.BODY
		Object.keys(req.body).forEach(item => {
			if (req.body[item] === '') delete req.body[item]
		})
		new Empreendimento(req.body).save()
			.then(data => res.json(data._id))
			.catch(err => console.error(err))
	})

	.put('/empreendimentos/:id', (req, res) => {
		if(req.body.status) {
			req.body.status = (req.body.status) ? true : false
		}
		console.log(req.body)
		Empreendimento.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.sendStatus(202))
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
			.select({ createdAt: false, updatedAt: false })
			.populate('cidade', 'name')
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.get('/images/:id', (req, res) => {
		Image.findOne({ _id: req.params.id })
			.select({ createdAt: false, updatedAt: false })
			.populate('cidade', 'name')
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})
	.post('/images', multer(multerConfigs).array('images'), (req, res, next) => {
		console.log(req.files)
		res.json({message: "okay"})
		// Image.insertMany(req.body)
		// 	.then(res.sendStatus(200))
		// 	.catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.post('/testes', (req, res, next) => {
		req.flash('success_msg', 'Atualizado com sucesso.')
		res.redirect('back')
	})
	.post('/images_teste', (req, res, next) => {
		req.flash('success_msg', 'Atualizado com sucesso.')
		res.json(req.body)
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = router