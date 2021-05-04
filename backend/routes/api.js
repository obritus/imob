const express = require('express')
const router = express.Router()
const crypto = require('crypto')
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
		fileSize: 2 * 2560 * 2560,
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

	.get('/empreendimentos/:id', async (req, res) => {
		await Empreendimento.findOne({ _id: req.params.id })
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
			.then(data => {
				res.json(data)
			})
			.catch(err => console.log(err))
	})

	.post('/empreendimentos', (req, res) => {
		//REMOVER ITENS NULLOS DO REQ.BODY
		Object.keys(req.body).forEach(item => {
			if (req.body[item] === '') delete req.body[item]
		})
		new Empreendimento(req.body).save()
			.then(data => res.json(data._id))
			.catch(err => {
				console.error(err)
				res.send(err)
			})
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
			.populate('bairros', 'name')
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
		Image.find({ empreendimento: req.params.id })
			.select({ createdAt: false, updatedAt: false })
			.then(data => res.json(data))
			.catch(err => console.log(err))
	})

	.put('/images/:id', (req, res) => {
		Image.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.sendStatus(202))
			.catch(err => console.log(err))
	})

	.post('/images', multer(multerConfigs).any(), (req, res, next) => {
		const _id = req.body._id
		const uploaded = []
		req.files.forEach(({ filename }) => {
			uploaded.push({ filename, empreendimento: _id })
		})

		Image.insertMany(uploaded)
			.then(data => {
				const fs = require('fs')
				const tmp_folder = path.resolve('tmp/uploads')
				const new_folder =
					path.resolve(`public/images/empreendimentos/${_id}`)
				
				console.log('new_folder:', new_folder)
				console.log('path.resolve:', path.resolve('public/images/empreendimentos', _id))
				console.log('Soma:', new_folder + '\\fooBar')

				// CRIA UMA NOVA PASTA PARA O EMPREENDIMENTO SE ELA NÃO EXISTIR
				if (!fs.existsSync(new_folder))	{ fs.mkdirSync(new_folder) }

				req.files.forEach(file => {
					fs.rename(
						(tmp_folder + `\\${file.filename}`),
						(new_folder + `\\${file.filename}`),
						err => {
							if (err) return console.error(err)
					})
				})
				res.json(data)
			})
			.catch(err => console.error(err))
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