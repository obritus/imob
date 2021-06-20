const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const multer = require('multer')
const path = require('path')
const axios = require('axios')

const Setting = require('../models/Setting') //CONFIGURAÇÕES DO APP
const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Empreendimento = require('../models/Empreendimento') //EMPREENDIMENTOS
const Cidade = require('../models/Cidade') //EMPREENDIMENTOS
const Bairro = require('../models/Bairro') //EMPREENDIMENTOS
const Message = require('../models/Message') //MENSAGENS
const Image = require('../models/Image') //IMAGE

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const multerConfigs = {
	dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, multerConfigs.dest)
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if(err) cb(err)
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
		if(allowedMimes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error("Tipo de arquivo inválido"))
		}
	}
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const read_messages = Message.find({ read: false }).countDocuments()

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = router
	.get('/', async (req, res) => {
		const empreendimentos = Empreendimento.find().countDocuments()
		const publicados = Empreendimento.find({ status: true }).countDocuments()
		const imagens = Image.find().countDocuments()
		const messages = Message.find().countDocuments()
		const cidades = Cidade.find().countDocuments()
		const bairros = Bairro.find().countDocuments()

		res.render('index', {
			title: 'Página Inícial',
			empreendimentos_number: await empreendimentos,
			emp_publicados_number: await publicados,
			images_number: await imagens,
			messages_number: await messages,
			messages_read_number: await read_messages,
			cidades_number: await cidades,
			bairros_number: await bairros,
			home: true
		})
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/empreendimentos', async (req, res) =>
		res.render('empreendimentos', {
			title: `Empreendimentos`,
			messages_read_number: await read_messages,
			empreendimentos: true
		})
	)

// -----------------------------------------------------------------------------

	.get('/empreendimentos/edit/:id', (req, res) =>
		res.render('empreendimentos/edit', {
			_id: req.params.id,
			title: `Editar empreendimento ${req.params.id}`,
			edit: true,
			empreendimentos: true
		})
	)

// -----------------------------------------------------------------------------

	.get('/empreendimentos/create', (req, res) => {
		res.render('empreendimentos/create', {
			_id: req.params.id,
			title: 'Adicionar novo empreendimento',
			create: true,
			empreendimentos: true
		})
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/cidades', async (req, res) => {
		const cidade = Cidade.find().lean().sort('name')
		return res.render('cidades', {
			title: `Cidades`,
			cidade: await cidade,
			messages_read_number: await read_messages,
			cidades: true,
			active: 'cidades'
		})
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/usuarios', async (req, res) => {
		const usuario = Usuario.find().lean().sort('name')
		const data = {
			usuario: await usuario,
			title: `Usuários`,
			messages_read_number: await read_messages,
			usuarios: true
		}
		return res.render('usuarios', data)
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/messages', async (req, res) => {
		const message = Message.find().lean().sort('createdAt')
		const data = {
			message: await message,
			title: `Mensagens`,
			messages_read_number: await read_messages,
			messages: true
		}
		return res.render('messages', data)
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/settings', async (req, res) => {
		const ObterSettings = Setting.findOne().lean()
			.populate([
				{
					path: 'destaques',
					populate: { path: "default_image", select: 'filename' }
				},
				{
					path: 'default_banner',
					populate: { path: "default_image", select: 'filename' }
				}
			])
		const Emps = Empreendimento.find({ status: true }).lean().sort('name')
		console.log(await ObterSettings)
		try {
			res.render('settings', {
				settings_page: true,
				title: `Configurações`,
				configs: await ObterSettings,
				emps: await Emps
			})
		} catch (error) {
			res.render('404')
		}
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/login', (req, res) => {
		res.render('login', {
			login: true,
			title: 'Entrar'
		})
	})
	.post('/teste', (req, res) => {
		res.json(req.body)
	})
	.get('/logout', (req, res) => {
		res.redirect('/')
	})