const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const multer = require('multer')
const path = require('path')
const axios = require('axios')

const Config = require('../models/Config') //CONFIGURAÇÕES DO APP
const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Empreendimento = require('../models/Empreendimento') //EMPREENDIMENTOS
const Cidade = require('../models/Cidade') //EMPREENDIMENTOS
const Bairro = require('../models/Bairro') //EMPREENDIMENTOS
const Message = require('../models/Message') //MENSAGENS
const Image = require('../models/Image') //IMAGE

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
const read_messages = Message.find({ read: false })

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	router.get('/', async (req, res) => {
		const users = Usuario.find()
		const empreendimentos = Empreendimento.find()
		const empreendimentos_publicados = Empreendimento.find({ status: true })
		const imagens = Image.find()
		const messages = Message.find()
		const cidades = Cidade.find()
		const bairros = Bairro.find()

		res.render('index', {
			title: 'Página Inícial',
			empreendimentos_number: (await empreendimentos).length,
			emp_publicados_number: (await empreendimentos_publicados).length,
			images_number: (await imagens).length,
			users_number: (await users).length,
			messages_number: (await messages).length,
			messages_read_number: (await read_messages).length,
			cidades_number: (await cidades).length,
			bairros_number: (await bairros).length,
			home: true
		})
	})

	.get('/logout', (req, res) => {
		res.redirect('/')
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/:page', async (req, res) => {
		const data = {}
		const page = req.params.page

		const GetTitle = t => {
			const titulos = {
				empreendimentos: 'Empreendimentos',
				cidades: 'Cidades',
				usuarios: 'Usuários',
				messages: 'Mensagens',
				config: 'Configurações',
				login: 'Entrar',
				undefined: ''
			}
			return titulos[t]
		}
		const titulo = GetTitle(page)

		const RenderPage = async args => {
			const data = {
				title: args.titulo,
				data: args.data,
				messages_read_number: (await read_messages).length
			}
			data[args.page] = true
			res.render(args.page, data)
		}

		if (page === 'empreendimentos') {
			const data = {
				search: req._parsedUrl.search
			}
			RenderPage({ page, titulo, data })
		}
		if (page === 'usuarios') {
			Usuario.find().lean()
				.then(usuarios => {
					const data = {
						usuarios: usuarios,
						usuarios_total: usuarios.length,
					}
					RenderPage({ page, titulo, data })
				})
				.catch(err => console.error(err))
		}
		if (page === 'config') {
			Config.findOne()
				.then(conf => RenderPage({ page, titulo, data: conf }))
				.catch(err => console.error(err))
		}
		if (page === 'messages') {
			Message.find().limit().lean()
				.then(messages => RenderPage({ page, titulo, data: messages }))
				.catch(err => console.error(err))
		}
		if (page === 'cidades') {
			const cidades = Cidade.find().lean().sort('name')
			const data = { cidades: await cidades }
			RenderPage({ page, titulo, data })
		}
		else {
			RenderPage({ page, titulo, data })
		}
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/empreendimentos/show/:id', (req, res) => {
		res.render('empreendimentos/show', {
			_id: req.params.id,
			show: true,
			empreendimentos: true
		})
	})
	.get('/empreendimentos/create', (req, res) => {
		res.render('empreendimentos/create', {
			_id: req.params.id,
			create: true,
			empreendimentos: true
		})
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.post('/usuarios/create', (req, res) => {
		const rb = req.body
		const erros = []

		if (!rb.nome || typeof rb.nome == undefined || rb.nome == null) {
			erros = [...erros, 'Nome inválido.']
		}
		if (!rb.email || typeof rb.email == undefined || rb.email == null) {
			erros = [...erros, 'Email inválido.']
		}
		if (!rb.senha || typeof rb.senha == undefined || rb.senha == null) {
			erros = [...erros, 'Senha inválida.']
		}

		if (erros.length > 0) {
			req.flash('error_msg', erros)
			res.sendStatus(200)
		}
		else {
			const senha = crypto.createHash('md5').update(rb.senha).digest("hex")
			var admin = ((rb.admin == 'true') ? true : false)

			const novoUsuario = {
				nome: rb.nome,
				email: rb.email,
				senha: senha,
				admin: admin,
				status: true,
			}

			new Usuario(novoUsuario).save().then(() => {
				req.flash('success_msg', 'Usuário adicionado com sucesso.')
				res.sendStatus(200)
			}).catch((e) => {
				req.flash('error_msg', 'Erro ao criar o novo usuário.')
			})
		}
	})

// -----------------------------------------------------------------------------
// DELETE ----------------------------------------------------------------------

	.get('/usuarios/:id/delete', (req, res) => {
		usuario_id = req.params.id
		Usuario.deleteOne({
			_id: usuario_id
		}).then(() => {
			res.send('Deletado com sucesso.')
		}).catch((err) => {
			req.flash('error_msg', 'Houve um erro ao tentar excluir o usuário.')
		})
	})

// -----------------------------------------------------------------------------
// SHOW ------------------------------------------------------------------------

	.get('/usuarios/:id', (req, res) => {
		usuario_id = req.params.id
		Usuario.findOne({
			_id: usuario_id
		}).lean().then((user) => {
			res.render('usuarios', { edit: true, user })
		}).catch((err) => {
			req.flash('error_msg', 'Usuário não encontrado.')
			res.redirect('/usuarios')
		})
	})

// -----------------------------------------------------------------------------
// EDIT ------------------------------------------------------------------------

	.post('/usuarios/:id/edit', (req, res) => {
		usuario_id = req.params.id
		const rb = req.body

		checarKeys = item => {
			if (!rb[item]) delete rb[item]
			if (item == 'senha' && rb[item]) {
				rb.senha = crypto.createHash('md5').update(rb.senha).digest("hex")
			}
			if (item == 'admin' && rb[item]) {
			}
		}

		Object.keys(rb).forEach(checarKeys)

		admin = ((!rb.admin) ? false : true)
		rb.updatedAt = Date.now() //ADICIONAR A DATA ATUAL DA ATUALIZAÇÃO

		Usuario.updateOne({ _id: usuario_id }, rb).then(() => {
			res.send('Atualizado com sucesso.')
		}).catch((err) => {})
	})
	.post('/upload/', multer(multerConfigs).single('file') ,(req, res) => {
		res.sendStatus(200)
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.post('/teste_images', multer(multerConfigs).array('images'), (req, res) => {
		console.log(req.body)
		const imagens = req.files.map(image => {
			return {
				filename: image.filename,
				empreendimento: req.body.empreendimento_id
			}
		})
		Image.insertMany(imagens).then(() => res.sendStatus(200))
	})

module.exports = router