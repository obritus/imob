require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const path = require('path')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = express()
const dashboard = require('./routes/index')
const api = require('./routes/api')

app
	// REQ BODY EXPRESS
	.use(cors())
	.use(cookieParser())
	.use(express.urlencoded({ extended: true }))
	.use(express.json())

	// TEMPLATE ENGINE
	.engine('handlebars', handlebars())
	.set('view engine', 'handlebars')

	// ROTAS
	.use(express.static(path.join(__dirname, 'public')))
	.use(express.static(path.join(__dirname, 'uploads')))
	.get('/', (req, res) => res.sendStatus(200))
	.use('/api', api)
	.use('/dashboard', dashboard)

	.listen(process.env.PORTA, () => {
		// BANCO DE DADOS
		mongoose.Promise = global.Promise
		mongoose.connect(
			process.env.MONGOOSE,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			() => console.log('Conectado ao Banco de Dados')
		)
	})