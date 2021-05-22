const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const multer = require('multer')
const path = require('path')
const axios = require('axios')

const Config = require('../models/Config') //CONFIGURAÇÕES DO APP
const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Empreendimento = require('../models/Empreendimento') //EMPREENDIMENTOS
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
const read_messages = async () => await Message.find({ read: false }).then(res => res.length)

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	router.get('/', async (req, res) => {
		const users = await Usuario.find().then(res => res.length)
		const empreendimentos = await Empreendimento.find().then(res => res.length)
		const messages = await Message.find().then(res => res.length)

		res.render('index', {
			title: 'Página Inicial',
			users_number: users,
			empreendimentos_number: empreendimentos,
			messages_number: messages,
			messages_read_number: read_messages(),
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
				undefined: '',
				usuarios: 'Usuários',
				clientes: 'Clientes',
				empreendimentos: 'Empreendimentos',
				messages: 'Mensagens',
				config: 'Configurações',
				login: 'Entrar'
			}
			return titulos[t]
		}
		const titulo = GetTitle(page)

		const RenderPage = args => {
			const data = {
				title: args.titulo,
				data: args.data,
				messages_read_number: read_messages()
			}
			data[args.page] = true
			console.log(page)
			return res.render(`${args.page}`, data)
		}

		if (page === 'empreendimentos') {
			const data = {
				search: req._parsedUrl.search
			}
			RenderPage({ page, titulo, data })
		}
		if (page === 'usuarios') {
			Usuario.find().lean().then(usuarios => {
				const data = {
					usuarios: usuarios,
					usuarios_total: usuarios.length,
				}
				RenderPage({ page, titulo, data })
			}).catch(err => {
				console.error(err)
			})
		}
		if (page === 'config') {
			Config.findOne().lean().then(config => {
				const data = {
					config: config
				}
				RenderPage({page, titulo, data})
			}).catch(err => {
				console.error(err)
			})
		}
		if (page === 'messages') {
			Message.find().limit().lean()
				.then(messages => {
					const data = {
						messages: messages
					}
					RenderPage({page, titulo, data})
				})
				.catch(err => console.error(err))
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
			req.flash('success_msg', 'Atualizado com sucesso.')
			res.send('Atualizado com sucesso.')
		}).catch((err) => {
			req.flash('error_msg', 'Houve um erro ao tentar excluir o usuário.')
		})
	})
	.post('/upload/', multer(multerConfigs).single('file') ,(req, res) => {
		res.sendStatus(200)
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/messages/:id', (req, res) => {
		Message.updateOne({_id: req.params.id}, {read: true}).then(() => {
			Message.findOne({_id: req.params.id})
				.then(data => res.json(data))
				.catch(err => console.error(err))
		}).catch(err => console.error(err))
	})
	.put('/messages/:id', (req, res) => {
		//MARCAR MENSAGEM COMO LIDA
		Message.updateOne({_id: req.params.id}, {read: false})
			.then(() => res.sendStatus(200))
			.catch(err => console.error(err))
	})
	.delete('/messages/:id', (req, res) => {
		//EXCLUIR MENSAGEM
		Message.deleteOne({_id: req.params.id})
			.then(() => res.sendStatus(200))
			.catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.post('/config', (req, res) => {
		// res.json(req.body)
		const status = req.body.carousel.status === 'on' ? true : false
		const dados = {
			$set: {
				"site_title": req.body.site_title,
				"carousel.status": req.body.carousel.status,
				"carousel.itens": req.body.carousel.itens		
			}
		}
		Config.updateOne({_id: '5fa0412d48b94e17a8f1ea6a'}, dados)
			.then(() => {
				res.sendStatus(200)
			}).catch(err => {
				res.sendStatus(404)
				console.error(err)
			})
	})
	.put('/config', (req, res) => {
		const data = {
			$set: {
				"carousel.status": req.body.status
			}
		}
		Config.updateOne({_id: '5fa0412d48b94e17a8f1ea6a'}, data)
			.then(() => res.sendStatus(200))
			.catch(err => console.error(err))
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.post('/clientes', (req, res) => {
		res.sendStatus(200)
	})
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