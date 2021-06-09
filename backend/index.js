const express = require('express')
const cors = require('cors')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const port = process.env.PORT || 3001
const mongooseURL = process.env.DB || 'mongodb+srv://britus:Newaccount1@clusterprincipal.an0h9.gcp.mongodb.net/lojs?retryWrites=true&w=majority'
const pages = require('./routes')
const api = require('./routes/api')
const mongoose = require('mongoose')
const session = require('express-session')

// DEFINIÇÕES
	// SESSIONS
		app.use(session({
			secret: "hash",
			resave: true,
			saveUninitialized: true
		}))
	// MIDDLEWARE
	// BODY PARSER
		app.use(cors())
		app.use(express.urlencoded({ extended: true }))
		app.use(express.json())
	// TEMPLATE ENGINE
		app.engine('handlebars', handlebars())
		app.set('view engine', 'handlebars')
		
		// ROTAS
		app.use(express.static('public'))
		app.use(express.static(path.join(__dirname, 'uploads')))
		app.use('/api/', api)
		app.use('/dashboard', pages)
		app.get('/', (req, res) => res.redirect('/dashboard'))

	// BANCO DE DADOS
		mongoose.Promise = global.Promise
		mongoose.connect(mongooseURL,
			{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
				console.log('Conectado ao Banco de Dados')
			})

//------------------------- LIGANDO O SERVIDOR ------------------------

app.listen(port)