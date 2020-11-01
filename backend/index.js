const express = require('express')
const cors = require('cors')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const port = 4000
const pages = require('./routes')
const api = require('./routes/api')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// DEFINIÇÕES
	// SESSIONS
		app.use(session({
			secret: "hash",
			resave: true,
			saveUninitialized: true
		}))
		app.use(flash())
	// MIDDLEWARE
		app.use((req, res, next) => {
			res.locals.success_msg = req.flash("success_msg")
			res.locals.error_msg = req.flash("error_msg")
			next()
		})
	// BODY PARSER
		app.use(cors())
		app.use(express.urlencoded({ extended: true }))
		app.use(express.json())
	// TEMPLATE ENGINE
		app.engine('handlebars', handlebars())
		app.set('view engine', 'handlebars')
		
		// ROTAS
		app.use(express.static('public'))
		app.use('/api/', api)
		app.use('/dashboard', pages)
		app.get('/', (req, res) => res.redirect('/dashboard'))

	// BANCO DE DADOS
		mongoose.Promise = global.Promise
		mongoose.connect('mongodb+srv://britus:Newaccount1@clusterprincipal.an0h9.gcp.mongodb.net/lojs?retryWrites=true&w=majority',
			{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
				console.log('Conectado ao Banco de Dados')
			})

//------------------------- LIGANDO O SERVIDOR ------------------------

app.listen(port, () => {
	console.log(`Servidor rodando na http://localhost:${port}`)
})