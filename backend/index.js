require('dotenv')
const express = require('express')
const cors = require('cors')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const port = process.env.PORT || 3001
const mongooseURL = 'mongodb+srv://britus:Newaccount1@clusterprincipal.an0h9.gcp.mongodb.net/lojs?retryWrites=true&w=majority'
const dashboard = require('./routes/index')
const api = require('./routes/api')
const mongoose = require('mongoose')
const session = require('express-session')

app
	.use(session({
		secret: "hash",
		resave: true,
		saveUninitialized: true
	}))
	
	// REQ BODY EXPRESS
	.use(cors())
	.use(express.urlencoded({ extended: true }))
	.use(express.json())

	// TEMPLATE ENGINE
	.engine('handlebars', handlebars())
	.set('view engine', 'handlebars')

	// ROTAS
	.use(express.static(path.join(__dirname, 'public')))
	.use(express.static(path.join(__dirname, 'uploads')))
	.get('/', (req, res) => res.sendFile('index.html'))
	.use('/api', api)
	.use('/dashboard', dashboard)

	.listen(port, () => {
		// BANCO DE DADOS
		mongoose.Promise = global.Promise
		mongoose.connect(mongooseURL,
			{ useNewUrlParser: true, useUnifiedTopology: true }, () =>
				console.log('Conectado ao Banco de Dados')
			)
	})