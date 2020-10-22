"use strict";

var express = require('express');

var cors = require('cors');

var handlebars = require('express-handlebars');

var path = require('path');

var app = express();
var port = 4000;
var tessss = process.env;

var pages = require('./routes');

var api = require('./routes/api');

var mongoose = require('mongoose');

var session = require('express-session');

var flash = require('connect-flash');

var _require = require('react-router-dom'),
    Redirect = _require.Redirect;

console.log(tessss); // DEFINIÇÕES
// SESSIONS

app.use(session({
  secret: "hash",
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); // MIDDLEWARE

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
}); // BODY PARSER

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); // TEMPLATE ENGINE

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars'); // ROTAS

app.use(express["static"]('public'));
app.use('/api/', api);
app.use('/dashboard', pages);
app.get('/', function (req, res) {
  return res.redirect('/dashboard');
}); // BANCO DE DADOS

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://britus:Newaccount1@clusterprincipal.an0h9.gcp.mongodb.net/lojs?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  console.log('Conectado ao Banco de Dados');
}); //------------------------- LIGANDO O SERVIDOR ------------------------

app.listen(port, function () {
  console.log("Servidor rodando na http://localhost:".concat(port));
});