const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const mongoose = require('mongoose')
const Usuario = require('../models/Usuario') //ESTRUTURA DOS USUÁRIOS NO DB
const Product = require('../models/Product') //ESTRUTURA DOS USUÁRIOS NO DB

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	router.get('/', async (req, res) => {
		const total_users = await Usuario.find().then(res => res.length)
		const total_products = await Product.find().then(res => res.length)

		res.render('index', {
			title: 'Página Inicial',
			users_number: total_users,
			products_number: total_products
		})
	})

	.get('/logout', (req, res) => {
		res.redirect('/')
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.get('/:page', (req, res) => {
		const data = {}
		const page = req.params.page
		const titulos = {
			usuarios: 'Usuários',
			clientes: 'Clientes',
			posts: 'Publicações',
			config: 'Configurações',
			login: 'Entrar',
		}
		const titulo = titulos[page]

		const RenderPage = args => {
			res.render(`${args.page}`, {
				title: args.titulo, data: args.data
			})
		}
		if (page === 'usuarios') {
			Usuario.find().lean().then(usuarios => {
				const data = {
					usuarios: usuarios,
					usuarios_total: usuarios.length,
				}
				RenderPage({ page, titulo, data })
			}).catch(err => {
				console.log(err)
			})
		}
		else {
			RenderPage({ page, titulo, data })
		}
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

	.post('/usuarios/create', (req, res) => {
		const rb = req.body
		console.log(req.body)
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
				console.log(rb.admin)
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

	.post('/teste', (req, res) => {
		console.log('Data do post:', req.body)
		res.send('teste')
	})
	.post('/products', (req, res) => {
		const produto = {
			name: req.body.name,
			price: req.body.price,
			status: true,
			datails: req.body.details
		}
		new Product(produto).save().then(() => {
			res.sendStatus(200)
		}).catch(err => {
			res.sendStatus(404)
			console.log(err)
		})
	})
	.put('/products/:id', async (req, res) => {
		console.log(req.params.id)
		const produto = {
			name: req.body.name,
			price: req.body.price,
			status: true,
			datails: req.body.details
		}
		Product.updateOne({_id: req.params.id}, req.body).then(() => {
			res.sendStatus(200)
		}).catch(err => {
			res.send('Erro na atualização')
			console.log(err)
		})
	})
	.delete('/products/:id', (req, res) => {
		const id = req.params.id
		Product.deleteOne({
			_id: id
		}).then(() => {
			req.flash('success_msg', 'Erro ao tentar excluir o produto.')
			res.redirect('/')
		}).catch((err) => {
			req.flash('error_msg', 'Houve um erro ao tentar excluir o produto.')
		})
	})

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = router